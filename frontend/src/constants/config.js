// API Configuration
export const API_BASE_URL = __DEV__
  ? 'http://localhost:8000'
  : 'https://api.crewlayover.com';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',

  // Destinations
  DESTINATIONS: '/destinations',
  DESTINATION_DETAIL: (id) => `/destinations/${id}`,

  // Recommendations
  RECOMMENDATIONS: '/recommendations',
  RECOMMENDATION_DETAIL: (id) => `/recommendations/${id}`,
  VOTE_RECOMMENDATION: (id) => `/recommendations/${id}/vote`,

  // User Tips
  TIPS: '/tips',
  MY_TIPS: '/tips/my-tips',
  PENDING_TIPS: '/tips/pending',
  MODERATE_TIP: (id) => `/tips/${id}/moderate`,
  VOTE_TIP: (id) => `/tips/${id}/vote`,

  // User Destinations
  VISITED: '/user-destinations/visited',
  WISHLIST: '/user-destinations/wishlist',
  UPDATE_USER_DESTINATION: (id) => `/user-destinations/${id}`,
};

export const COLORS = {
  primary: '#1E40AF',
  secondary: '#60A5FA',
  accent: '#F59E0B',
  background: '#F9FAFB',
  white: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
  error: '#EF4444',
  success: '#10B981',
};
