import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { COLORS } from '../constants/config';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.full_name?.charAt(0) || 'U'}</Text>
        </View>
        <Text style={styles.name}>{user?.full_name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        {user?.airline && <Text style={styles.airline}>{user.airline}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Visited Destinations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Tips</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Privacy</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileSection: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  airline: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 8,
    fontWeight: '600',
  },
  section: {
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textLight,
    padding: 15,
    paddingBottom: 8,
    textTransform: 'uppercase',
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuText: {
    fontSize: 16,
    color: COLORS.text,
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: COLORS.error,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
