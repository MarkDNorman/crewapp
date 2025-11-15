import api from './api';

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    const { access_token, user } = response.data;

    localStorage.setItem('authToken', access_token);
    localStorage.setItem('user', JSON.stringify(user));

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

    localStorage.setItem('authToken', access_token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token: access_token, user };
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return localStorage.getItem('authToken');
  },
};
