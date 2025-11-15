# CrewLayover - Complete Setup Guide

Step-by-step guide to get CrewLayover running locally.

## Prerequisites Checklist

- [ ] Python 3.9 or higher installed
- [ ] Node.js 18 or higher installed
- [ ] PostgreSQL 14 or higher installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd crewapp
```

## Step 2: PostgreSQL Setup

### Option A: Local PostgreSQL

1. Install PostgreSQL:
   - **Mac**: `brew install postgresql`
   - **Ubuntu**: `sudo apt-get install postgresql`
   - **Windows**: Download from postgresql.org

2. Start PostgreSQL service:
   - **Mac**: `brew services start postgresql`
   - **Ubuntu**: `sudo service postgresql start`
   - **Windows**: Start from Services

3. Create database:
```bash
# Access PostgreSQL
psql postgres

# Create user and database
CREATE USER crewlayover WITH PASSWORD 'crewlayover';
CREATE DATABASE crewlayover OWNER crewlayover;
GRANT ALL PRIVILEGES ON DATABASE crewlayover TO crewlayover;
\q
```

### Option B: Docker PostgreSQL

```bash
docker run -d \
  --name crewlayover-db \
  -e POSTGRES_DB=crewlayover \
  -e POSTGRES_USER=crewlayover \
  -e POSTGRES_PASSWORD=crewlayover \
  -p 5432:5432 \
  postgres:14-alpine
```

## Step 3: Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Mac/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
```

Edit `backend/.env`:
```env
DATABASE_URL=postgresql://crewlayover:crewlayover@localhost:5432/crewlayover
SECRET_KEY=your-secret-key-change-this
WEATHER_API_KEY=your-openweather-api-key  # Get from openweathermap.org
REDIS_URL=redis://localhost:6379
ENVIRONMENT=development
```

### Get OpenWeather API Key (Free)
1. Go to https://openweathermap.org/api
2. Sign up for free account
3. Generate API key
4. Add to `.env` file

## Step 4: Run Backend

```bash
# Still in backend/ directory with venv activated
python run.py
```

Verify it's working:
- Open http://localhost:8000
- Open http://localhost:8000/docs (API documentation)

## Step 5: Seed Database

In a new terminal (keep backend running):

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python seed_data.py
```

This creates:
- ✅ Admin user: `admin@crewlayover.com` / `admin123`
- ✅ Crew user: `crew@example.com` / `crew123`
- ✅ Sample destinations (Tokyo, Dubai)
- ✅ Sample recommendations

## Step 6: Mobile App Setup

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start Expo
npm start
```

### Running the App

1. **On iOS Simulator** (Mac only):
   - Press `i` in the terminal
   - Or: `npm run ios`

2. **On Android Emulator**:
   - Ensure Android Studio and emulator are running
   - Press `a` in the terminal
   - Or: `npm run android`

3. **On Physical Device**:
   - Install "Expo Go" app from App Store or Play Store
   - Scan QR code shown in terminal
   - Ensure device is on same WiFi network as computer

4. **In Web Browser**:
   - Press `w` in the terminal
   - Or: `npm run web`

## Step 7: Admin Panel Setup

In a new terminal:

```bash
cd admin-panel

# Install dependencies
npm install

# Start development server
npm start
```

Open http://localhost:3000 and login with:
- Email: `admin@crewlayover.com`
- Password: `admin123`

## Verification Checklist

- [ ] Backend running at http://localhost:8000
- [ ] API docs accessible at http://localhost:8000/docs
- [ ] Database seeded successfully
- [ ] Mobile app running (choose one platform)
- [ ] Can login to mobile app
- [ ] Can view destinations on map
- [ ] Admin panel running at http://localhost:3000
- [ ] Can login to admin panel

## Common Issues & Solutions

### Issue: Can't connect to database
**Solution**: Ensure PostgreSQL is running and credentials in `.env` are correct

### Issue: Backend won't start
**Solution**:
- Check if port 8000 is already in use
- Verify all dependencies installed: `pip list`
- Check `.env` file exists and is configured

### Issue: Mobile app can't connect to API
**Solution**:
- Ensure backend is running
- For physical device: Update `API_BASE_URL` in `frontend/src/constants/config.js` to your computer's IP
- For iOS: Use `http://localhost:8000`
- For Android emulator: May need to use `http://10.0.2.2:8000`

### Issue: Expo won't start
**Solution**:
- Clear cache: `expo start -c`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node -v` (should be 18+)

### Issue: Maps not showing
**Solution**:
- Maps work better on physical devices
- For web, ensure browser allows location access
- Check console for errors

## Next Steps

1. **Explore the Mobile App**:
   - Login with crew user
   - Browse destinations
   - View destination details
   - Upvote recommendations

2. **Test Admin Features**:
   - Login to admin panel
   - Submit a tip from mobile app
   - Approve/reject it in admin panel

3. **Customize**:
   - Add more destinations
   - Create recommendations
   - Customize colors in `frontend/src/constants/config.js`

## Production Deployment

See main README.md for deployment instructions.

## Getting Help

- Check API docs: http://localhost:8000/docs
- Review logs in terminal windows
- Check browser console for frontend errors

---

**You're all set! 🎉**

Test login credentials:
- **Mobile App**: `crew@example.com` / `crew123`
- **Admin Panel**: `admin@crewlayover.com` / `admin123`
