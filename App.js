import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import LocationScreen1 from "./screens/LocationScreen1";
import AddLocationScreen from "./screens/AddLocationScreen";
import MapScreen1 from "./screens/MapScreen1";
import CountryScreen from "./screens/CountryScreen"; // New capitals screen

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Locations">
        {/* Locations Tab */}
        <Tab.Screen
          name="Locations"
          component={LocationScreen1}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
          }}
        />

        {/* Add Location Tab */}
        <Tab.Screen
          name="Add Location"
          component={AddLocationScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
          }}
        />

        {/* Map Tab */}
        <Tab.Screen
          name="Map"
          component={MapScreen1}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" size={size} color={color} />
            ),
          }}
        />

        {/* Capitals Tab */}
        <Tab.Screen
          name="Capitals"
          component={CountryScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="earth" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
