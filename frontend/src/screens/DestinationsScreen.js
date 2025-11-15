import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Image,
} from 'react-native';
import { destinationService } from '../services/destinationService';
import { COLORS } from '../constants/config';

export default function DestinationsScreen({ navigation }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDestination = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DestinationDetail', { destinationId: item.id })}
    >
      {item.cover_image_url && (
        <Image source={{ uri: item.cover_image_url }} style={styles.image} />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.country}>{item.country}</Text>
        {item.region && <Text style={styles.region}>{item.region}</Text>}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search destinations..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredDestinations}
        renderItem={renderDestination}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
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
  searchInput: {
    backgroundColor: COLORS.white,
    padding: 15,
    margin: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  list: {
    padding: 15,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.border,
  },
  cardContent: {
    padding: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  country: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  region: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
