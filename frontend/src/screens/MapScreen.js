import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { destinationService } from '../services/destinationService';
import { COLORS } from '../constants/config';

export default function MapScreen({ navigation }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    try {
      const data = await destinationService.getDestinations();
      setDestinations(data);
    } catch (error) {
      console.error('Error loading destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerPress = (destination) => {
    navigation.navigate('DestinationDetail', { destinationId: destination.id });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 25.0,
          longitude: 25.0,
          latitudeDelta: 80,
          longitudeDelta: 80,
        }}
      >
        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            title={destination.name}
            description={destination.country}
            onPress={() => handleMarkerPress(destination)}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
