from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..config.database import get_db
from ..models.recommendation import Recommendation
from ..models.user import User
from ..schemas.recommendation import RecommendationCreate, RecommendationResponse
from ..middleware.auth_middleware import get_current_user, get_admin_user

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.get("", response_model=List[RecommendationResponse])
async def list_recommendations(
    destination_id: Optional[int] = None,
    category: Optional[str] = None,
    tags: Optional[str] = Query(None, description="Comma-separated tags"),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List recommendations with optional filtering"""
    query = db.query(Recommendation)

    if destination_id:
        query = query.filter(Recommendation.destination_id == destination_id)
    if category:
        query = query.filter(Recommendation.category == category)

    recommendations = query.offset(skip).limit(limit).all()

    # Filter by tags if provided
    if tags:
        tag_list = [t.strip() for t in tags.split(",")]
        recommendations = [
            r for r in recommendations
            if r.tags and any(tag in r.tags for tag in tag_list)
        ]

    return recommendations


@router.get("/{recommendation_id}", response_model=RecommendationResponse)
async def get_recommendation(
    recommendation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a single recommendation by ID"""
    recommendation = db.query(Recommendation).filter(
        Recommendation.id == recommendation_id
    ).first()

    if not recommendation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recommendation not found"
        )

    return recommendation


@router.post("", response_model=RecommendationResponse, status_code=status.HTTP_201_CREATED)
async def create_recommendation(
    recommendation_data: RecommendationCreate,
    db: Session = Depends(get_db),
    admin_user: User = Depends(get_admin_user)
):
    """Create a new recommendation (admin only)"""
    new_recommendation = Recommendation(**recommendation_data.model_dump())

    db.add(new_recommendation)
    db.commit()
    db.refresh(new_recommendation)

    return new_recommendation


@router.put("/{recommendation_id}", response_model=RecommendationResponse)
async def update_recommendation(
    recommendation_id: int,
    recommendation_data: RecommendationCreate,
    db: Session = Depends(get_db),
    admin_user: User = Depends(get_admin_user)
):
    """Update a recommendation (admin only)"""
    recommendation = db.query(Recommendation).filter(
        Recommendation.id == recommendation_id
    ).first()

    if not recommendation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recommendation not found"
        )

    for key, value in recommendation_data.model_dump().items():
        setattr(recommendation, key, value)

    db.commit()
    db.refresh(recommendation)

    return recommendation


@router.delete("/{recommendation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_recommendation(
    recommendation_id: int,
    db: Session = Depends(get_db),
    admin_user: User = Depends(get_admin_user)
):
    """Delete a recommendation (admin only)"""
    recommendation = db.query(Recommendation).filter(
        Recommendation.id == recommendation_id
    ).first()

    if not recommendation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recommendation not found"
        )

    db.delete(recommendation)
    db.commit()

    return None


@router.post("/{recommendation_id}/vote")
async def vote_recommendation(
    recommendation_id: int,
    vote_type: str = Query(..., regex="^(upvote|downvote)$"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Vote on a recommendation"""
    recommendation = db.query(Recommendation).filter(
        Recommendation.id == recommendation_id
    ).first()

    if not recommendation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recommendation not found"
        )

    if vote_type == "upvote":
        recommendation.upvotes += 1
    else:
        recommendation.downvotes += 1

    db.commit()
    db.refresh(recommendation)

    return {"message": "Vote recorded", "upvotes": recommendation.upvotes, "downvotes": recommendation.downvotes}
