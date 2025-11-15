from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..config.database import get_db
from ..models.user_tip import UserTip, TipStatus
from ..models.moderation_log import ModerationLog, ModerationDecision
from ..models.user import User
from ..schemas.user_tip import UserTipCreate, UserTipResponse, UserTipModerate
from ..middleware.auth_middleware import get_current_user, get_admin_user

router = APIRouter(prefix="/tips", tags=["user-tips"])


@router.get("", response_model=List[UserTipResponse])
async def list_tips(
    destination_id: Optional[int] = None,
    status_filter: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List user tips"""
    query = db.query(UserTip)

    # Regular users can only see approved tips
    if current_user.role == "crew":
        query = query.filter(UserTip.status == TipStatus.APPROVED)
    elif status_filter:
        query = query.filter(UserTip.status == status_filter)

    if destination_id:
        query = query.filter(UserTip.destination_id == destination_id)

    tips = query.offset(skip).limit(limit).all()
    return tips


@router.get("/my-tips", response_model=List[UserTipResponse])
async def get_my_tips(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current user's tips"""
    tips = db.query(UserTip).filter(UserTip.user_id == current_user.id).all()
    return tips


@router.get("/pending", response_model=List[UserTipResponse])
async def get_pending_tips(
    db: Session = Depends(get_db),
    admin_user: User = Depends(get_admin_user)
):
    """Get pending tips for moderation (admin only)"""
    tips = db.query(UserTip).filter(UserTip.status == TipStatus.PENDING).all()
    return tips


@router.post("", response_model=UserTipResponse, status_code=status.HTTP_201_CREATED)
async def create_tip(
    tip_data: UserTipCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Submit a new tip"""
    new_tip = UserTip(
        user_id=current_user.id,
        **tip_data.model_dump()
    )

    db.add(new_tip)
    db.commit()
    db.refresh(new_tip)

    return new_tip


@router.post("/{tip_id}/moderate")
async def moderate_tip(
    tip_id: int,
    moderation: UserTipModerate,
    db: Session = Depends(get_db),
    admin_user: User = Depends(get_admin_user)
):
    """Moderate a tip (admin only)"""
    tip = db.query(UserTip).filter(UserTip.id == tip_id).first()

    if not tip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tip not found"
        )

    if tip.status != TipStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tip has already been moderated"
        )

    # Update tip status
    if moderation.decision == "approved":
        tip.status = TipStatus.APPROVED
        decision = ModerationDecision.APPROVED
    else:
        tip.status = TipStatus.REJECTED
        decision = ModerationDecision.REJECTED

    # Create moderation log
    log = ModerationLog(
        tip_id=tip_id,
        moderator_id=admin_user.id,
        decision=decision,
        reason=moderation.reason
    )

    db.add(log)
    db.commit()
    db.refresh(tip)

    return {"message": "Tip moderated successfully", "tip": tip}


@router.post("/{tip_id}/vote")
async def vote_tip(
    tip_id: int,
    vote_type: str = Query(..., regex="^(upvote|downvote)$"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Vote on a tip"""
    tip = db.query(UserTip).filter(UserTip.id == tip_id).first()

    if not tip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tip not found"
        )

    if tip.status != TipStatus.APPROVED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can only vote on approved tips"
        )

    if vote_type == "upvote":
        tip.upvotes += 1
    else:
        tip.downvotes += 1

    db.commit()
    db.refresh(tip)

    return {"message": "Vote recorded", "upvotes": tip.upvotes, "downvotes": tip.downvotes}
