# CrewLayover - Quick Start Guide

Get up and running in 3 minutes! (No database setup required)

## Prerequisites

- Python 3.9+
- Node.js 18+

## 1. Backend Setup (1 minute)

```bash
cd backend
./install.sh  # Automated setup script
source venv/bin/activate
python run.py
```

**Or manually:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python run.py
```

Backend running at: http://localhost:8000
✅ Uses SQLite - no database setup needed!

## 2. Seed Data (30 seconds)

```bash
# In new terminal
cd backend
source venv/bin/activate
python seed_data.py
```

## 3. Mobile App (1 minute)

```bash
# In new terminal
cd frontend
npm install
npm start
```

Press `w` for web browser or scan QR code with Expo Go app.

## 4. Admin Panel (1 minute)

```bash
# In new terminal
cd admin-panel
npm install
npm start
```

Open: http://localhost:3000

## Test Credentials

**Mobile App (Crew)**
- Email: `crew@example.com`
- Password: `crew123`

**Admin Panel**
- Email: `admin@crewlayover.com`
- Password: `admin123`

## Verify Everything Works

1. ✅ Backend: http://localhost:8000/health
2. ✅ API Docs: http://localhost:8000/docs
3. ✅ Mobile: Login and view destinations
4. ✅ Admin: Login and view pending tips

## Troubleshooting

**Backend won't start?**
```bash
# Verify .env file exists
cat backend/.env

# Check dependencies are installed
pip list | grep fastapi
```

**Mobile app can't connect?**
- Ensure backend is running on port 8000
- Check `frontend/src/constants/config.js`

**Want to use PostgreSQL instead?**
- See `POSTGRESQL_SETUP.md` for detailed instructions
- Install with: `pip install -r requirements-postgres.txt`

## What's Next?

- Explore the mobile app features
- Submit a tip and moderate it in admin panel
- Add more destinations via admin endpoints
- Check out the full documentation in README.md

---

**Need detailed setup?** See SETUP.md

**API Documentation:** http://localhost:8000/docs
