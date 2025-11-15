from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..config.database import Base
import enum


class UserRole(str, enum.Enum):
    CREW = "crew"
    ADMIN = "admin"
    MODERATOR = "moderator"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    airline = Column(String, nullable=True)
    role = Column(Enum(UserRole), default=UserRole.CREW, nullable=False)
    is_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    badges = Column(String, nullable=True)  # JSON string of badges
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    tips = relationship("UserTip", back_populates="user")
    visited_destinations = relationship("UserDestination", back_populates="user")
