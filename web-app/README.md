# CrewLayover Web App

Web application for CrewLayover - optimized for desktop/laptop use.

## Features

- 🗺️ Interactive map with destination markers
- 📍 Browse destinations in list or map view
- 🌤️ Real-time weather information
- ⭐ View and vote on recommendations
- 📱 Responsive design
- 🔐 Secure authentication

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at http://localhost:3001

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure API URL (optional):**
```bash
# Create .env file
cp .env.example .env

# Edit .env if backend is not at localhost:8000
REACT_APP_API_URL=http://localhost:8000
```

3. **Start the app:**
```bash
npm start
```

## Usage

### Login
Use the test credentials:
- **Email:** `crew@example.com`
- **Password:** `crew123`

### Features

**Map View**
- See all destinations on an interactive map
- Click markers to view destination details

**Destinations List**
- Browse all destinations in a grid
- Search by name or country
- Click cards to view details

**Destination Details**
- View complete information about a destination
- See current weather
- Browse recommendations
- Vote on recommendations (upvote/downvote)
- View 24h and 48h layover highlights
- Read safety tips

## Building for Production

```bash
npm run build
```

The build files will be in the `build/` directory.

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Manual
1. Build: `npm run build`
2. Upload `build/` directory to web server
3. Configure environment variables on hosting platform

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:8000)

## Tech Stack

- **React** - UI library
- **React Router** - Navigation
- **React Leaflet** - Interactive maps
- **Axios** - HTTP client
- **CSS3** - Styling

## Troubleshooting

**Can't connect to backend?**
- Ensure backend is running on port 8000
- Check `REACT_APP_API_URL` in `.env`
- Verify CORS is enabled in backend

**Map not loading?**
- Check browser console for errors
- Ensure internet connection (map tiles load from OpenStreetMap)

**Login not working?**
- Verify backend is running
- Check that you've seeded the database with `python seed_data.py`
- Use correct credentials: `crew@example.com` / `crew123`

## Development

**Hot reloading**
- Changes automatically reload in browser
- Edit files in `src/` directory

**Code structure**
```
src/
├── components/     # Reusable components (Navbar, etc)
├── contexts/       # React contexts (Auth)
├── pages/          # Page components
├── services/       # API services
└── styles/         # CSS files
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- This is a web-optimized version of the mobile app
- Built specifically for desktop/laptop browsers
- For mobile devices, use the React Native app
- Admin features are in the separate admin panel at port 3000
