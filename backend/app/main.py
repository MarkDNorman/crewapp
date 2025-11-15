from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config.settings import settings
from .config.database import engine, Base
from .routes import auth, destinations, recommendations, user_tips, user_destinations

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CrewLayover API",
    description="API for CrewLayover - A curated travel companion app for airline cabin crew",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS if settings.ENVIRONMENT == "development" else [],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(destinations.router)
app.include_router(recommendations.router)
app.include_router(user_tips.router)
app.include_router(user_destinations.router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to CrewLayover API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
