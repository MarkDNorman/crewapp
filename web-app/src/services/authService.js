import api from './api';

// Helper to safely access localStorage
const safeLocalStorage = {
  getItem(key) {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem(key, value) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
  },
  removeItem(key) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  },
};

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    const { access_token, user } = response.data;

    safeLocalStorage.setItem('authToken', access_token);
    safeLocalStorage.setItem('user', JSON.stringify(user));

    return { token: access_token, user };
  },

  async register(email, password, full_name, airline) {
    const response = await api.post('/auth/register', {
      email,
      password,
      full_name,
      airline,
    });
    const { access_token, user } = response.data;

    safeLocalStorage.setItem('authToken', access_token);
    safeLocalStorage.setItem('user', JSON.stringify(user));

    return { token: access_token, user };
  },

  logout() {
    safeLocalStorage.removeItem('authToken');
    safeLocalStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = safeLocalStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return safeLocalStorage.getItem('authToken');
  },
};
