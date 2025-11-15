from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..config.database import get_db
from ..models.user_destination import UserDestination
from ..models.destination import Destination
from ..models.user import User
from ..schemas.destination import DestinationListResponse
from ..middleware.auth_middleware import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/user-destinations", tags=["user-destinations"])


class UpdateUserDestination(BaseModel):
    visited: bool = False
    want_to_visit: bool = False


@router.get("/visited", response_model=List[DestinationListResponse])
async def get_visited_destinations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get user's visited destinations"""
    user_destinations = db.query(UserDestination).filter(
        UserDestination.user_id == current_user.id,
        UserDestination.visited == True
    ).all()

    destination_ids = [ud.destination_id for ud in user_destinations]
    destinations = db.query(Destination).filter(Destination.id.in_(destination_ids)).all()

    return destinations


@router.get("/wishlist", response_model=List[DestinationListResponse])
async def get_wishlist_destinations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get user's wishlist destinations"""
    user_destinations = db.query(UserDestination).filter(
        UserDestination.user_id == current_user.id,
        UserDestination.want_to_visit == True
    ).all()

    destination_ids = [ud.destination_id for ud in user_destinations]
    destinations = db.query(Destination).filter(Destination.id.in_(destination_ids)).all()

    return destinations


@router.post("/{destination_id}")
async def update_user_destination(
    destination_id: int,
    data: UpdateUserDestination,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Mark a destination as visited or add to wishlist"""
    # Check if destination exists
    destination = db.query(Destination).filter(Destination.id == destination_id).first()
    if not destination:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Destination not found"
        )

    # Check if user destination record exists
    user_destination = db.query(UserDestination).filter(
        UserDestination.user_id == current_user.id,
        UserDestination.destination_id == destination_id
    ).first()

    if user_destination:
        # Update existing record
        user_destination.visited = data.visited
        user_destination.want_to_visit = data.want_to_visit
    else:
        # Create new record
        user_destination = UserDestination(
            user_id=current_user.id,
            destination_id=destination_id,
            visited=data.visited,
            want_to_visit=data.want_to_visit
        )
        db.add(user_destination)

    db.commit()
    db.refresh(user_destination)

    return {"message": "User destination updated successfully"}


@router.delete("/{destination_id}")
async def remove_user_destination(
    destination_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Remove a destination from user's lists"""
    user_destination = db.query(UserDestination).filter(
        UserDestination.user_id == current_user.id,
        UserDestination.destination_id == destination_id
    ).first()

    if not user_destination:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User destination not found"
        )

    db.delete(user_destination)
    db.commit()

    return {"message": "User destination removed successfully"}
