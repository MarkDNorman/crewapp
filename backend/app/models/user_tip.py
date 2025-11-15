from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..config.database import Base
import enum


class TipStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


class UserTip(Base):
    __tablename__ = "user_tips"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)
    recommendation_id = Column(Integer, ForeignKey("recommendations.id"), nullable=True)

    title = Column(String, nullable=True)
    content = Column(Text, nullable=False)
    category = Column(String, nullable=True)
    photos = Column(JSON, nullable=True)  # List of photo URLs

    status = Column(Enum(TipStatus), default=TipStatus.PENDING, nullable=False)

    # Ratings
    upvotes = Column(Integer, default=0)
    downvotes = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="tips")
    destination = relationship("Destination", back_populates="user_tips")
    moderation_logs = relationship("ModerationLog", back_populates="tip")
