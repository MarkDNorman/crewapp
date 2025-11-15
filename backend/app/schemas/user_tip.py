from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class UserTipBase(BaseModel):
    destination_id: int
    content: str
    title: Optional[str] = None
    category: Optional[str] = None


class UserTipCreate(UserTipBase):
    recommendation_id: Optional[int] = None
    photos: Optional[List[str]] = None


class UserTipResponse(UserTipBase):
    id: int
    user_id: int
    recommendation_id: Optional[int] = None
    photos: Optional[List[str]] = None
    status: str
    upvotes: int = 0
    downvotes: int = 0
    created_at: datetime

    class Config:
        from_attributes = True


class UserTipModerate(BaseModel):
    decision: str  # "approved" or "rejected"
    reason: Optional[str] = None
