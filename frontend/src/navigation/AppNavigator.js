import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MapScreen from '../screens/MapScreen';
import DestinationsScreen from '../screens/DestinationsScreen';
import DestinationDetailScreen from '../screens/DestinationDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1E40AF',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          headerTitle: 'Destinations Map',
        }}
      />
      <Tab.Screen
        name="Destinations"
        component={DestinationsScreen}
        options={{
          tabBarLabel: 'List',
          headerTitle: 'All Destinations',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          headerTitle: 'My Profile',
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DestinationDetail"
            component={DestinationDetailScreen}
            options={{ title: 'Destination Details' }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Create Account' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
