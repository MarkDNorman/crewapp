import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { COLORS } from '../constants/config';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [airline, setAirline] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !fullName) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, fullName, airline);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join the crew community</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name *"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email *"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password *"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Airline (optional)"
        value={airline}
        onChangeText={setAirline}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 20,
    justifyContent: 'center',
    minHeight: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 20,
  },
});
