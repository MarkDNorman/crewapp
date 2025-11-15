from sqlalchemy import Column, Integer, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..config.database import Base


class UserDestination(Base):
    """Track user's visited and want-to-visit destinations"""
    __tablename__ = "user_destinations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)

    visited = Column(Boolean, default=False)
    want_to_visit = Column(Boolean, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="visited_destinations")
    destination = relationship("Destination", back_populates="user_destinations")
