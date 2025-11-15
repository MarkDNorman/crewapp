from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://crewlayover:crewlayover@localhost:5432/crewlayover"

    # Security
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days

    # External APIs
    WEATHER_API_KEY: Optional[str] = None

    # Redis
    REDIS_URL: str = "redis://localhost:6379"

    # Environment
    ENVIRONMENT: str = "development"

    # CORS
    ALLOWED_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:19006",  # Expo web
        "exp://localhost:19000",   # Expo mobile
    ]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
