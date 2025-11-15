# CrewLayover Backend API

FastAPI-based REST API for CrewLayover application.

## Features

- RESTful API with automatic OpenAPI documentation
- JWT-based authentication
- SQLite database (default) or PostgreSQL with SQLAlchemy ORM
- Role-based access control (crew, moderator, admin)
- Weather API integration (OpenWeather)
- Content moderation system
- Input validation with Pydantic

## Project Structure

```
backend/
├── app/
│   ├── config/           # Configuration and database setup
│   ├── models/           # SQLAlchemy models
│   ├── routes/           # API endpoints
│   ├── schemas/          # Pydantic schemas
│   ├── services/         # Business logic
│   ├── middleware/       # Authentication middleware
│   └── main.py          # FastAPI application
├── migrations/          # Database migrations (Alembic)
├── requirements.txt     # Python dependencies
├── run.py              # Development server
└── seed_data.py        # Database seeding script
```

## Quick Setup (Recommended)

**Option 1: Automated Install Script**
```bash
chmod +x install.sh
./install.sh
source venv/bin/activate
python run.py
```

**Option 2: Manual Setup**

1. Create virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
```bash
cp .env.example .env
# Default uses SQLite - works immediately!
# Edit .env to customize settings or add weather API key
```

4. Run the server:
```bash
python run.py
```

The API will be available at `http://localhost:8000`

## Database Options

### SQLite (Default - Recommended for Development)
- ✅ **No setup required** - works out of the box
- ✅ Already configured in `.env.example`
- ✅ Great for development and testing
- Database file: `crewlayover.db` (created automatically)

### PostgreSQL (Optional - Recommended for Production)
1. Install PostgreSQL on your system
2. Install PostgreSQL dependencies:
```bash
pip install -r requirements-postgres.txt
```
3. Update `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/crewlayover
```

See `POSTGRESQL_SETUP.md` for detailed PostgreSQL installation instructions.

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Database Seeding

To populate the database with sample data:

```bash
python seed_data.py
```

This creates:
- Admin user: `admin@crewlayover.com` / `admin123`
- Crew user: `crew@example.com` / `crew123`
- Sample destinations (Tokyo, Dubai)
- Sample recommendations

## Testing

```bash
pytest
```

## Environment Variables

Default configuration in `.env`:

```env
# Database (SQLite by default)
DATABASE_URL=sqlite:///./crewlayover.db

# For PostgreSQL, uncomment and configure:
# DATABASE_URL=postgresql://user:password@localhost:5432/crewlayover

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# External APIs (optional)
WEATHER_API_KEY=your-openweather-api-key

# Environment
ENVIRONMENT=development
```

**Note:** The app works immediately with SQLite. Weather API key is optional but recommended.

## User Roles

- **crew**: Regular users, can view content and submit tips
- **moderator**: Can approve/reject user tips
- **admin**: Full access, can create/edit destinations and recommendations

## Endpoints Overview

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user

### Destinations
- `GET /destinations` - List destinations
- `GET /destinations/{id}` - Get destination with weather
- `POST /destinations` - Create (admin only)
- `PUT /destinations/{id}` - Update (admin only)
- `DELETE /destinations/{id}` - Delete (admin only)

### Recommendations
- `GET /recommendations` - List recommendations
- `GET /recommendations/{id}` - Get recommendation
- `POST /recommendations` - Create (admin only)
- `PUT /recommendations/{id}` - Update (admin only)
- `DELETE /recommendations/{id}` - Delete (admin only)
- `POST /recommendations/{id}/vote` - Vote

### User Tips
- `GET /tips` - List approved tips
- `GET /tips/my-tips` - Get user's tips
- `GET /tips/pending` - Get pending (admin only)
- `POST /tips` - Submit tip
- `POST /tips/{id}/moderate` - Moderate (admin only)
- `POST /tips/{id}/vote` - Vote

### User Destinations
- `GET /user-destinations/visited` - Get visited
- `GET /user-destinations/wishlist` - Get wishlist
- `POST /user-destinations/{id}` - Update
- `DELETE /user-destinations/{id}` - Remove
