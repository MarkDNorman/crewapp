from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, JSON, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..config.database import Base
import enum


class RecommendationCategory(str, enum.Enum):
    ACTIVITY = "activity"
    FOOD_DRINK = "food_drink"
    TRANSPORT = "transport"
    PRACTICAL_TIP = "practical_tip"


class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)
    category = Column(Enum(RecommendationCategory), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)

    # Timing & logistics
    opening_hours = Column(JSON, nullable=True)  # {day: {open, close}}
    best_time_for_crew = Column(String, nullable=True)
    duration_minutes = Column(Integer, nullable=True)
    peak_times = Column(JSON, nullable=True)

    # Cost & booking
    price_range = Column(String, nullable=True)  # $, $$, $$$
    entrance_fee = Column(Float, nullable=True)
    reservation_required = Column(String, nullable=True)

    # Location & directions
    address = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    directions_from_airport_hotel = Column(Text, nullable=True)
    travel_time_minutes = Column(Integer, nullable=True)
    transport_options = Column(JSON, nullable=True)

    # Additional info
    nearby_food_options = Column(Text, nullable=True)
    safety_notes = Column(Text, nullable=True)
    tags = Column(JSON, nullable=True)  # ["late-night", "near-hotel", "24h"]
    images = Column(JSON, nullable=True)

    # Crew ratings
    upvotes = Column(Integer, default=0)
    downvotes = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    destination = relationship("Destination", back_populates="recommendations")
