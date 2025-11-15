from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class DestinationBase(BaseModel):
    name: str
    country: str
    region: Optional[str] = None
    latitude: float
    longitude: float
    description: Optional[str] = None


class DestinationCreate(DestinationBase):
    highlights_24h: Optional[List[str]] = None
    highlights_48h: Optional[List[str]] = None
    near_airport_hotels: Optional[List[str]] = None
    safety_tips: Optional[List[str]] = None
    areas_to_avoid: Optional[str] = None
    transport_info: Optional[Dict[str, Any]] = None
    emergency_contacts: Optional[Dict[str, Any]] = None
    local_tips: Optional[str] = None
    timezone: Optional[str] = None
    cover_image_url: Optional[str] = None
    images: Optional[List[str]] = None


class DestinationResponse(DestinationBase):
    id: int
    highlights_24h: Optional[List[str]] = None
    highlights_48h: Optional[List[str]] = None
    near_airport_hotels: Optional[List[str]] = None
    safety_tips: Optional[List[str]] = None
    areas_to_avoid: Optional[str] = None
    transport_info: Optional[Dict[str, Any]] = None
    emergency_contacts: Optional[Dict[str, Any]] = None
    local_tips: Optional[str] = None
    timezone: Optional[str] = None
    cover_image_url: Optional[str] = None
    images: Optional[List[str]] = None
    created_at: datetime

    class Config:
        from_attributes = True


class DestinationListResponse(BaseModel):
    id: int
    name: str
    country: str
    region: Optional[str] = None
    latitude: float
    longitude: float
    cover_image_url: Optional[str] = None

    class Config:
        from_attributes = True


class DestinationWithWeather(DestinationResponse):
    weather: Optional[Dict[str, Any]] = None
    forecast: Optional[Dict[str, Any]] = None
    astronomy: Optional[Dict[str, Any]] = None
