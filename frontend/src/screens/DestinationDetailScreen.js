import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { destinationService } from '../services/destinationService';
import { COLORS } from '../constants/config';

export default function DestinationDetailScreen({ route }) {
  const { destinationId } = route.params;
  const [destination, setDestination] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDestinationDetails();
  }, []);

  const loadDestinationDetails = async () => {
    try {
      const [destData, recsData] = await Promise.all([
        destinationService.getDestinationById(destinationId),
        destinationService.getRecommendations(destinationId),
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
      loadDestinationDetails(); // Reload to get updated vote counts
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!destination) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Destination not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {destination.cover_image_url && (
        <Image source={{ uri: destination.cover_image_url }} style={styles.coverImage} />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{destination.name}</Text>
        <Text style={styles.country}>{destination.country}</Text>

        {destination.description && (
          <Text style={styles.description}>{destination.description}</Text>
        )}

        {/* Weather Section */}
        {destination.weather && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Weather</Text>
            <Text style={styles.weatherText}>
              {Math.round(destination.weather.main?.temp)}°C -{' '}
              {destination.weather.weather?.[0]?.description}
            </Text>
          </View>
        )}

        {/* 24h Highlights */}
        {destination.highlights_24h && destination.highlights_24h.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>24h Layover Highlights</Text>
            {destination.highlights_24h.map((highlight, index) => (
              <Text key={index} style={styles.bullet}>
                • {highlight}
              </Text>
            ))}
          </View>
        )}

        {/* 48h Highlights */}
        {destination.highlights_48h && destination.highlights_48h.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>48h Layover Highlights</Text>
            {destination.highlights_48h.map((highlight, index) => (
              <Text key={index} style={styles.bullet}>
                • {highlight}
              </Text>
            ))}
          </View>
        )}

        {/* Safety Tips */}
        {destination.safety_tips && destination.safety_tips.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Safety Tips</Text>
            {destination.safety_tips.map((tip, index) => (
              <Text key={index} style={styles.bullet}>
                • {tip}
              </Text>
            ))}
          </View>
        )}

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {recommendations.map((rec) => (
            <View key={rec.id} style={styles.recommendationCard}>
              <Text style={styles.recTitle}>{rec.title}</Text>
              <Text style={styles.recCategory}>{rec.category}</Text>
              <Text style={styles.recDescription}>{rec.description}</Text>

              {rec.duration_minutes && (
                <Text style={styles.recDetail}>⏱ {rec.duration_minutes} minutes</Text>
              )}

              {rec.price_range && (
                <Text style={styles.recDetail}>💰 {rec.price_range}</Text>
              )}

              {rec.best_time_for_crew && (
                <Text style={styles.recDetail}>🕐 {rec.best_time_for_crew}</Text>
              )}

              <View style={styles.voteContainer}>
                <TouchableOpacity
                  style={styles.voteButton}
                  onPress={() => handleVote(rec.id, 'upvote')}
                >
                  <Text>👍 {rec.upvotes}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.voteButton}
                  onPress={() => handleVote(rec.id, 'downvote')}
                >
                  <Text>👎 {rec.downvotes}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 250,
    backgroundColor: COLORS.border,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  country: {
    fontSize: 18,
    color: COLORS.textLight,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 10,
  },
  bullet: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 6,
    lineHeight: 22,
  },
  weatherText: {
    fontSize: 16,
    color: COLORS.text,
    textTransform: 'capitalize',
  },
  recommendationCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  recTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  recCategory: {
    fontSize: 12,
    color: COLORS.textLight,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  recDescription: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 10,
  },
  recDetail: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  voteContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  voteButton: {
    backgroundColor: COLORS.background,
    padding: 8,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
});
