# CrewLayover Mobile App

React Native mobile application built with Expo.

## Features

- Cross-platform (iOS & Android)
- JWT authentication
- Interactive world map with destination pins
- Searchable destination list
- Detailed destination pages with weather
- Recommendation voting
- User profile management

## Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac only) or Android Studio

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure API endpoint:
   - Development: API defaults to `http://localhost:8000`
   - For physical device testing, update `API_BASE_URL` in `src/constants/config.js`

3. Start the app:
```bash
npm start
```

## Running on Different Platforms

### iOS Simulator (Mac only)
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Physical Device
1. Install Expo Go app from App Store or Play Store
2. Scan QR code shown in terminal or browser

### Web Browser
```bash
npm run web
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── contexts/        # React contexts (Auth)
│   ├── navigation/      # Navigation setup
│   ├── screens/         # Screen components
│   ├── services/        # API services
│   ├── constants/       # Constants and config
│   └── utils/          # Utility functions
├── assets/             # Images, fonts, etc.
├── App.js             # Root component
└── package.json       # Dependencies
```

## Screens

1. **LoginScreen** - User login
2. **RegisterScreen** - New user registration
3. **MapScreen** - Interactive world map
4. **DestinationsScreen** - List view with search
5. **DestinationDetailScreen** - Destination details
6. **ProfileScreen** - User account

## Navigation

- **Bottom Tabs**: Map, List, Profile
- **Stack Navigation**: Detail screens

## API Integration

All API calls are handled through service layers:

- `authService.js` - Authentication
- `destinationService.js` - Destinations and recommendations

## State Management

- **Auth Context** - Global authentication state
- Local state with React hooks

## Styling

- StyleSheet API for component styling
- Consistent color scheme from `constants/config.js`
- Responsive layouts

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## Troubleshooting

### Can't connect to backend
- Ensure backend is running on `http://localhost:8000`
- For physical device, use your computer's IP address
- Update `API_BASE_URL` in `src/constants/config.js`

### Map not showing
- Ensure you have proper permissions for location
- Check Google Maps API key (if using custom maps)

### Expo Go issues
- Clear Expo cache: `expo start -c`
- Reinstall Expo Go app
- Check if ports are not blocked (19000, 19001, 19002)
