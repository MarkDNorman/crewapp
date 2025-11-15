from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..config.database import Base
import enum


class ModerationDecision(str, enum.Enum):
    APPROVED = "approved"
    REJECTED = "rejected"


class ModerationLog(Base):
    __tablename__ = "moderation_logs"

    id = Column(Integer, primary_key=True, index=True)
    tip_id = Column(Integer, ForeignKey("user_tips.id"), nullable=False)
    moderator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    decision = Column(Enum(ModerationDecision), nullable=False)
    reason = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    tip = relationship("UserTip", back_populates="moderation_logs")
