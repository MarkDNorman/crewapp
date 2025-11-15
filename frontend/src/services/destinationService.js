import api from './api';
import { API_ENDPOINTS } from '../constants/config';

export const destinationService = {
  async getDestinations(params = {}) {
    const response = await api.get(API_ENDPOINTS.DESTINATIONS, { params });
    return response.data;
  },

  async getDestinationById(id, includeWeather = true) {
    const response = await api.get(API_ENDPOINTS.DESTINATION_DETAIL(id), {
      params: { include_weather: includeWeather },
    });
    return response.data;
  },

  async getRecommendations(destinationId) {
    const response = await api.get(API_ENDPOINTS.RECOMMENDATIONS, {
      params: { destination_id: destinationId },
    });
    return response.data;
  },

  async voteRecommendation(recommendationId, voteType) {
    const response = await api.post(
      API_ENDPOINTS.VOTE_RECOMMENDATION(recommendationId),
      null,
      { params: { vote_type: voteType } }
    );
    return response.data;
  },

  async getVisitedDestinations() {
    const response = await api.get(API_ENDPOINTS.VISITED);
    return response.data;
  },

  async getWishlistDestinations() {
    const response = await api.get(API_ENDPOINTS.WISHLIST);
    return response.data;
  },

  async updateUserDestination(destinationId, data) {
    const response = await api.post(
      API_ENDPOINTS.UPDATE_USER_DESTINATION(destinationId),
      data
    );
    return response.data;
  },
};
