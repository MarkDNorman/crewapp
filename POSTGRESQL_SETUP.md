# Quick Fix - PostgreSQL Setup for macOS

## The Problem
The backend needs PostgreSQL database, but it's not installed/running yet.

## Solution

### 1. Install PostgreSQL (using Homebrew)

```bash
# Install PostgreSQL
brew install postgresql@14

# Start PostgreSQL service
brew services start postgresql@14
```

### 2. Create Database and User

```bash
# Connect to PostgreSQL
psql postgres

# Run these commands in psql:
CREATE USER crewlayover WITH PASSWORD 'crewlayover';
CREATE DATABASE crewlayover OWNER crewlayover;
GRANT ALL PRIVILEGES ON DATABASE crewlayover TO crewlayover;
\q
```

### 3. Verify PostgreSQL is Running

```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Or try connecting
psql -U crewlayover -d crewlayover -c "SELECT version();"
```

### 4. Now Run the Backend

```bash
cd /Users/marknorman/Desktop/crewapp/backend
source venv/bin/activate
python run.py
```

## Alternative: Use Docker (Easier!)

If you prefer not to install PostgreSQL locally:

```bash
# Run PostgreSQL in Docker
docker run -d \
  --name crewlayover-db \
  -e POSTGRES_DB=crewlayover \
  -e POSTGRES_USER=crewlayover \
  -e POSTGRES_PASSWORD=crewlayover \
  -p 5432:5432 \
  postgres:14-alpine

# Check it's running
docker ps
```

## Alternative: Use SQLite (No Setup Needed!)

If you want to skip PostgreSQL setup entirely for now, you can use SQLite:

1. Edit `backend/.env`:
```env
DATABASE_URL=sqlite:///./crewlayover.db
```

2. Install SQLite support:
```bash
pip install aiosqlite
```

3. Run the backend - it will create the database automatically!

---

**Choose one option above and you'll be ready to go!**
