import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import LocationsScreen from "./screens/LocationScreen1";
import AddLocationScreen from "./screens/AddLocationScreen";
import MapScreen from "./screens/MapScreen1";
import CountryScreen from "./screens/CountryScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen 
          name="Locations" 
          component={LocationsScreen} 
          options={{ tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          )}}
        />
        <Tab.Screen 
          name="Add Location" 
          component={AddLocationScreen} 
          options={{ tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          )}}
        />
        <Tab.Screen 
          name="Map" 
          component={MapScreen} 
          options={{ tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          )}}
        />
        <Tab.Screen 
          name="Country" 
          component={CountryScreen} 
          options={{ tabBarIcon: ({ color, size }) => (
            <Ionicons name="flag" size={size} color={color} />
          )}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
