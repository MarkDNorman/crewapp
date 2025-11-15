import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { destinationService } from '../services/destinationService';
import '../styles/DestinationDetail.css';

function DestinationDetail() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDestinationDetails();
  }, [id]);

  const loadDestinationDetails = async () => {
    try {
      const [destData, recsData] = await Promise.all([
        destinationService.getDestinationById(id),
        destinationService.getRecommendations(id),
      ]);
      setDestination(destData);
      setRecommendations(recsData);
    } catch (error) {
      console.error('Error loading destination:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (recommendationId, voteType) => {
    try {
      await destinationService.voteRecommendation(recommendationId, voteType);
      loadDestinationDetails();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!destination) {
    return <div className="loading">Destination not found</div>;
  }

  return (
    <div className="destination-detail">
      <Link to="/destinations" className="back-button">
        ← Back to Destinations
      </Link>

      <div className="destination-header">
        {destination.cover_image_url && (
          <img
            src={destination.cover_image_url}
            alt={destination.name}
            className="destination-cover"
          />
        )}
        {!destination.cover_image_url && (
          <div className="destination-cover"></div>
        )}

        <div className="destination-title-section">
          <h1 className="destination-title">{destination.name}</h1>
          <p className="destination-location">{destination.country}</p>
          {destination.description && (
            <p className="destination-description">{destination.description}</p>
          )}
        </div>
      </div>

      {/* Weather Section */}
      {destination.weather && (
        <div className="destination-section">
          <h2 className="section-title">Current Weather</h2>
          <div className="weather-info">
            <div className="weather-card">
              <div className="weather-temp">
                {Math.round(destination.weather.main?.temp)}°C
              </div>
              <div className="weather-desc">
                {destination.weather.weather?.[0]?.description}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 24h Highlights */}
      {destination.highlights_24h && destination.highlights_24h.length > 0 && (
        <div className="destination-section">
          <h2 className="section-title">24h Layover Highlights</h2>
          <div className="highlights-list">
            {destination.highlights_24h.map((highlight, index) => (
              <div key={index} className="highlight-item">
                {highlight}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 48h Highlights */}
      {destination.highlights_48h && destination.highlights_48h.length > 0 && (
        <div className="destination-section">
          <h2 className="section-title">48h Layover Highlights</h2>
          <div className="highlights-list">
            {destination.highlights_48h.map((highlight, index) => (
              <div key={index} className="highlight-item">
                {highlight}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Safety Tips */}
      {destination.safety_tips && destination.safety_tips.length > 0 && (
        <div className="destination-section">
          <h2 className="section-title">Safety Tips</h2>
          <div className="highlights-list">
            {destination.safety_tips.map((tip, index) => (
              <div key={index} className="highlight-item">
                {tip}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="destination-section">
          <h2 className="section-title">Recommendations</h2>
          <div className="recommendations-grid">
            {recommendations.map((rec) => (
              <div key={rec.id} className="recommendation-card">
                <div className="rec-header">
                  <div>
                    <h3 className="rec-title">{rec.title}</h3>
                    <span className="rec-category">{rec.category}</span>
                  </div>
                </div>

                <p className="rec-description">{rec.description}</p>

                <div className="rec-details">
                  {rec.duration_minutes && (
                    <div className="rec-detail">
                      <strong>Duration:</strong> {rec.duration_minutes} minutes
                    </div>
                  )}
                  {rec.price_range && (
                    <div className="rec-detail">
                      <strong>Price:</strong> {rec.price_range}
                    </div>
                  )}
                  {rec.best_time_for_crew && (
                    <div className="rec-detail">
                      <strong>Best time:</strong> {rec.best_time_for_crew}
                    </div>
                  )}
                </div>

                <div className="vote-section">
                  <button
                    className="vote-btn"
                    onClick={() => handleVote(rec.id, 'upvote')}
                  >
                    👍 {rec.upvotes}
                  </button>
                  <button
                    className="vote-btn"
                    onClick={() => handleVote(rec.id, 'downvote')}
                  >
                    👎 {rec.downvotes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DestinationDetail;
