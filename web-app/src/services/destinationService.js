import api from './api';

export const destinationService = {
  async getDestinations(params = {}) {
    const response = await api.get('/destinations', { params });
    return response.data;
  },

  async getDestinationById(id, includeWeather = true) {
    const response = await api.get(`/destinations/${id}`, {
      params: { include_weather: includeWeather },
    });
    return response.data;
  },

  async getRecommendations(destinationId) {
    const response = await api.get('/recommendations', {
      params: { destination_id: destinationId },
    });
    return response.data;
  },

  async voteRecommendation(recommendationId, voteType) {
    const response = await api.post(
      `/recommendations/${recommendationId}/vote`,
      null,
      { params: { vote_type: voteType } }
    );
    return response.data;
  },

  async submitTip(tipData) {
    const response = await api.post('/tips', tipData);
    return response.data;
  },

  async voteTip(tipId, voteType) {
    const response = await api.post(
      `/tips/${tipId}/vote`,
      null,
      { params: { vote_type: voteType } }
    );
    return response.data;
  },

  async getVisitedDestinations() {
    const response = await api.get('/user-destinations/visited');
    return response.data;
  },

  async getWishlistDestinations() {
    const response = await api.get('/user-destinations/wishlist');
    return response.data;
  },

  async updateUserDestination(destinationId, data) {
    const response = await api.post(`/user-destinations/${destinationId}`, data);
    return response.data;
  },
};
