import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { destinationService } from '../services/destinationService';
import '../styles/Destinations.css';

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadDestinations();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = destinations.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations(destinations);
    }
  }, [searchQuery, destinations]);

  const loadDestinations = async () => {
    try {
      const data = await destinationService.getDestinations();
      setDestinations(data);
      setFilteredDestinations(data);
    } catch (error) {
      console.error('Error loading destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="destinations-page">
      <div className="page-header">
        <h1>Explore Destinations</h1>
        <input
          type="text"
          className="search-bar"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="destinations-grid">
        {filteredDestinations.map((destination) => (
          <Link
            key={destination.id}
            to={`/destinations/${destination.id}`}
            className="destination-card"
          >
            {destination.cover_image_url && (
              <img
                src={destination.cover_image_url}
                alt={destination.name}
                className="destination-image"
              />
            )}
            {!destination.cover_image_url && (
              <div className="destination-image"></div>
            )}
            <div className="destination-content">
              <h2 className="destination-name">{destination.name}</h2>
              <p className="destination-country">{destination.country}</p>
              {destination.region && (
                <p className="destination-region">{destination.region}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="loading">
          <p>No destinations found</p>
        </div>
      )}
    </div>
  );
}

export default Destinations;
