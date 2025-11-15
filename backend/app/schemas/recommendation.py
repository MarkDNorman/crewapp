from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class RecommendationBase(BaseModel):
    destination_id: int
    category: str
    title: str
    description: str


class RecommendationCreate(RecommendationBase):
    opening_hours: Optional[Dict[str, Any]] = None
    best_time_for_crew: Optional[str] = None
    duration_minutes: Optional[int] = None
    peak_times: Optional[List[str]] = None
    price_range: Optional[str] = None
    entrance_fee: Optional[float] = None
    reservation_required: Optional[str] = None
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    directions_from_airport_hotel: Optional[str] = None
    travel_time_minutes: Optional[int] = None
    transport_options: Optional[List[str]] = None
    nearby_food_options: Optional[str] = None
    safety_notes: Optional[str] = None
    tags: Optional[List[str]] = None
    images: Optional[List[str]] = None


class RecommendationResponse(RecommendationBase):
    id: int
    opening_hours: Optional[Dict[str, Any]] = None
    best_time_for_crew: Optional[str] = None
    duration_minutes: Optional[int] = None
    peak_times: Optional[List[str]] = None
    price_range: Optional[str] = None
    entrance_fee: Optional[float] = None
    reservation_required: Optional[str] = None
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    directions_from_airport_hotel: Optional[str] = None
    travel_time_minutes: Optional[int] = None
    transport_options: Optional[List[str]] = None
    nearby_food_options: Optional[str] = None
    safety_notes: Optional[str] = None
    tags: Optional[List[str]] = None
    images: Optional[List[str]] = None
    upvotes: int = 0
    downvotes: int = 0
    created_at: datetime

    class Config:
        from_attributes = True
