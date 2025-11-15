# CrewLayover Admin Panel

React-based web admin panel for content moderation.

## Features

- User authentication for admins/moderators
- Pending tips moderation queue
- Approve/reject user-submitted tips
- Clean, responsive interface

## Prerequisites

- Node.js 18+
- Backend API running

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure API URL:
```bash
# Create .env file
echo "REACT_APP_API_URL=http://localhost:8000" > .env
```

3. Start development server:
```bash
npm start
```

The admin panel will be available at `http://localhost:3000`

## Default Admin Login

After running the seed script:
- Email: `admin@crewlayover.com`
- Password: `admin123`

## Project Structure

```
admin-panel/
├── public/
│   └── index.html
├── src/
│   ├── pages/          # Page components
│   │   ├── Login.js
│   │   └── Dashboard.js
│   ├── services/       # API services
│   │   └── api.js
│   ├── App.js         # Root component
│   └── index.js       # Entry point
└── package.json       # Dependencies
```

## Features

### Login Page
- Admin/moderator authentication
- Role verification
- Error handling

### Dashboard
- View pending user tips
- Approve or reject tips
- Add optional rejection reason
- Real-time updates

## Building for Production

```bash
npm run build
```

The build output will be in the `build/` directory.

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

### Manual Deployment
1. Build the app: `npm run build`
2. Upload `build/` directory to your web server
3. Configure environment variables on hosting platform

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:8000)

## Troubleshooting

### Can't login
- Ensure backend is running
- Check API URL in `.env`
- Verify user has admin or moderator role

### Changes not reflecting
- Clear browser cache
- Check browser console for errors
- Verify API endpoints are accessible
