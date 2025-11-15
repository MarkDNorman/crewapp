from sqlalchemy import Column, Integer, String, Text, Float, JSON, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..config.database import Base


class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    country = Column(String, nullable=False, index=True)
    region = Column(String, nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    description = Column(Text, nullable=True)

    # Crew-specific highlights
    highlights_24h = Column(JSON, nullable=True)  # List of activity IDs/descriptions
    highlights_48h = Column(JSON, nullable=True)
    near_airport_hotels = Column(JSON, nullable=True)

    # Safety & logistics
    safety_tips = Column(JSON, nullable=True)
    areas_to_avoid = Column(Text, nullable=True)
    transport_info = Column(JSON, nullable=True)

    # Practical info
    emergency_contacts = Column(JSON, nullable=True)
    local_tips = Column(Text, nullable=True)
    timezone = Column(String, nullable=True)

    # Images
    cover_image_url = Column(String, nullable=True)
    images = Column(JSON, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    recommendations = relationship("Recommendation", back_populates="destination")
    user_tips = relationship("UserTip", back_populates="destination")
    user_destinations = relationship("UserDestination", back_populates="destination")
