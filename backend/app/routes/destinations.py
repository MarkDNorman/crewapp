from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..config.database import get_db
from ..models.destination import Destination
from ..models.user import User
from ..schemas.destination import (
    DestinationCreate,
    DestinationResponse,
    DestinationListResponse,
    DestinationWithWeather
)
from ..services.weather import WeatherService
from ..middleware.auth_middleware import get_current_user, get_admin_user

router = APIRouter(prefix="/destinations", tags=["destinations"])


@router.get("", response_model=List[DestinationListResponse])
async def list_destinations(
    region: Optional[str] = None,
    country: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all destinations with optional filtering"""
    query = db.query(Destination)

    if region:
        query = query.filter(Destination.region == region)
    if country:
        query = query.filter(Destination.country == country)
    if search:
        query = query.filter(
            Destination.name.ilike(f"%{search}%") |
            Destination.country.ilike(f"%{search}%")
        )

    destinations = query.offset(skip).limit(limit).all()
    return destinations


@router.get("/{destination_id}", response_model=DestinationWithWeather)
async def get_destination(
    destination_id: int,
    include_weather: bool = True,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a single destination by ID with weather data"""
    destination = db.query(Destination).filter(Destination.id == destination_id).first()

    if not destination:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Destination not found"
        )

    response_data = {
        **destination.__dict__,
        "weather": None,
        "forecast": None,
        "astronomy": None
    }

    if include_weather:
        weather_service = WeatherService()
        response_data["weather"] = weather_service.get_current_weather(
            destination.latitude,
            destination.longitude
        )
        response_data["forecast"] = weather_service.get_forecast(
            destination.latitude,
            destination.longitude
        )
        response_data["astronomy"] = weather_service.get_astronomy(
            destination.latitude,
            destination.longitude
        )

    return response_data


@router.post("", response_model=DestinationResponse, status_code=status.HTTP_201_CREATED)
async def create_destination(
    destination_data: DestinationCreate,
    db: Session = Depends(get_db),
    admin_user: User = Depends(get_admin_user)
):
    """Create a new destination (admin only)"""
    new_destination = Destination(**destination_data.model_dump())

    db.add(new_destination)
    db.commit()
    db.refresh(new_destination)

    return new_destination


@router.put("/{destination_id}", response_model=DestinationResponse)
async def update_destination(
    destination_id: int,
    destination_data: DestinationCreate,
    db: Session = Depends(get_db),
    admin_user: User = Depends(get_admin_user)
):
    """Update a destination (admin only)"""
    destination = db.query(Destination).filter(Destination.id == destination_id).first()

    if not destination:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Destination not found"
        )

    for key, value in destination_data.model_dump().items():
        setattr(destination, key, value)

    db.commit()
    db.refresh(destination)

    return destination


@router.delete("/{destination_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_destination(
    destination_id: int,
    db: Session = Depends(get_db),
    admin_user: User = Depends(get_admin_user)
):
    """Delete a destination (admin only)"""
    destination = db.query(Destination).filter(Destination.id == destination_id).first()

    if not destination:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Destination not found"
        )

    db.delete(destination)
    db.commit()

    return None
