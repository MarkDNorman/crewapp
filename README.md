# CrewLayover - MVP

A curated, location-based travel companion app designed specifically for airline cabin crew who frequently fly to diverse destinations with limited layover time.

## 🎯 Overview

CrewLayover provides effortlessly actionable recommendations, hyper-relevant logistics, and verified crew-specific insights to help users make the most of short stays (24-48 hours).

## 📋 Features

### Core Features (MVP)
- ✅ **User Authentication** - Secure login/register for crew members
- ✅ **World Map View** - Interactive map showing all destinations
- ✅ **Destination List** - Searchable, filterable list of destinations
- ✅ **Destination Details** - Comprehensive info including:
  - Weather & forecast
  - 24h & 48h layover highlights
  - Safety tips and local insights
  - Curated recommendations (activities, food, transport)
- ✅ **Crew-Curated Recommendations** - Admin-moderated content
- ✅ **User Tips System** - Community-driven insights with moderation
- ✅ **Voting System** - Upvote/downvote recommendations and tips
- ✅ **Admin Panel** - Content moderation interface
- ✅ **Weather Integration** - Real-time weather data

## 🏗️ Architecture

```
crewapp/
├── backend/          # FastAPI backend
├── frontend/         # React Native mobile app (Expo)
├── admin-panel/      # React web admin panel
└── docs/            # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL 14+
- Redis (optional, for caching)

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your settings (database URL, secret key, weather API key)

# Run the server
python run.py
```

The API will be available at `http://localhost:8000`
- API docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

### 2. Seed Database (Optional)

```bash
cd backend
python seed_data.py
```

This creates:
- Admin user: `admin@crewlayover.com` / `admin123`
- Crew user: `crew@example.com` / `crew123`
- Sample destinations (Tokyo, Dubai)
- Sample recommendations

### 3. Mobile App Setup

```bash
cd frontend

# Install dependencies
npm install

# Start Expo development server
npm start

# Options:
# - Press 'a' for Android emulator
# - Press 'i' for iOS simulator
# - Scan QR code with Expo Go app on physical device
```

### 4. Admin Panel Setup

```bash
cd admin-panel

# Install dependencies
npm install

# Start development server
npm start
```

Admin panel will be available at `http://localhost:3000`

## 🐳 Docker Setup (Alternative)

```bash
# Start all services with Docker Compose
docker-compose up -d

# Services:
# - Backend API: http://localhost:8000
# - Admin Panel: http://localhost:3000
# - PostgreSQL: localhost:5432
# - Redis: localhost:6379
```

## 📱 Mobile App Features

### Screens
1. **Login/Register** - User authentication
2. **Map View** - Interactive world map with destination pins
3. **Destinations List** - Searchable list with filters
4. **Destination Detail** - Complete destination information
5. **Profile** - User account management

### Navigation
- Bottom tabs: Map, List, Profile
- Stack navigation for detail views

## 🔑 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Destinations
- `GET /destinations` - List all destinations
- `GET /destinations/{id}` - Get destination with weather
- `POST /destinations` - Create destination (admin)
- `PUT /destinations/{id}` - Update destination (admin)

### Recommendations
- `GET /recommendations?destination_id={id}` - Get recommendations
- `POST /recommendations` - Create recommendation (admin)
- `POST /recommendations/{id}/vote` - Vote on recommendation

### User Tips
- `GET /tips?destination_id={id}` - Get approved tips
- `POST /tips` - Submit new tip
- `GET /tips/pending` - Get pending tips (admin)
- `POST /tips/{id}/moderate` - Moderate tip (admin)
- `POST /tips/{id}/vote` - Vote on tip

### User Destinations
- `GET /user-destinations/visited` - Get visited destinations
- `GET /user-destinations/wishlist` - Get wishlist
- `POST /user-destinations/{id}` - Mark as visited/wishlist

## 🎨 Design System

### Colors
- Primary: `#1E40AF` (Blue)
- Secondary: `#60A5FA` (Light Blue)
- Accent: `#F59E0B` (Gold)
- Background: `#F9FAFB` (Light Gray)
- Error: `#EF4444` (Red)
- Success: `#10B981` (Green)

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (crew, moderator, admin)
- Input validation with Pydantic
- CORS protection

## 📊 Database Schema

### Core Models
- **User** - Crew members with authentication
- **Destination** - Cities with coordinates and metadata
- **Recommendation** - Admin-curated content
- **UserTip** - User-submitted content (moderated)
- **ModerationLog** - Audit trail for moderation
- **UserDestination** - Track visited/wishlist

## 🌤️ Weather Integration

Uses OpenWeather API for:
- Current weather conditions
- 7-day forecast
- Sunrise/sunset times
- UV index

Get your API key at: https://openweathermap.org/api

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test

# Admin panel tests
cd admin-panel
npm test
```

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/crewlayover
SECRET_KEY=your-secret-key-here
WEATHER_API_KEY=your-openweather-api-key
REDIS_URL=redis://localhost:6379
ENVIRONMENT=development
```

### Admin Panel (.env)
```env
REACT_APP_API_URL=http://localhost:8000
```

## 🚀 Deployment

### Backend
- Deploy to: Heroku, AWS, DigitalOcean, Railway
- Database: PostgreSQL on AWS RDS, Heroku Postgres
- Caching: Redis Cloud, AWS ElastiCache

### Frontend
- Build: `expo build:android` / `expo build:ios`
- Publish: Google Play Store, Apple App Store
- OTA Updates: Expo EAS Update

### Admin Panel
- Build: `npm run build`
- Deploy to: Vercel, Netlify, AWS S3 + CloudFront

## 📈 Future Enhancements (Phase 2+)

- [ ] AI-generated personalized itineraries
- [ ] Airline-specific versions
- [ ] Safety ratings by neighborhood
- [ ] Crew meetups feature
- [ ] Multi-language support
- [ ] Currency converter
- [ ] Jet-lag mode recommendations
- [ ] Offline mode with local caching
- [ ] Push notifications
- [ ] Social features (follow crew, share itineraries)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

Copyright © 2024 CrewLayover. All rights reserved.

## 📧 Support

For issues or questions, please contact: support@crewlayover.com

---

**Built with ❤️ for airline cabin crew worldwide**
