import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import { API_ENDPOINTS } from '../constants/config';

export const authService = {
  async login(email, password) {
    const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
    const { access_token, user } = response.data;

    await AsyncStorage.setItem('authToken', access_token);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    return { token: access_token, user };
  },

  async register(email, password, full_name, airline) {
    const response = await api.post(API_ENDPOINTS.REGISTER, {
      email,
      password,
      full_name,
      airline,
    });
    const { access_token, user } = response.data;

    await AsyncStorage.setItem('authToken', access_token);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    return { token: access_token, user };
  },

  async logout() {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user');
  },

  async getCurrentUser() {
    try {
      const response = await api.get(API_ENDPOINTS.ME);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getStoredUser() {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  async getStoredToken() {
    return await AsyncStorage.getItem('authToken');
  },
};
