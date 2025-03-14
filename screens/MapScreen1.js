import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps"; // mapView and marker components for the map
import * as Location from "expo-location"; 

export default function MapScreen1({ route }) {
  const [region, setRegion] = useState({
    latitude: 48.8566, 
    longitude: 2.3522,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const { cityName } = route.params || {}; // Get city name from the route params
// Get geolocation based on the city name passed as a parameter
  useEffect(() => {
    if (cityName) {
      Location.geocodeAsync(cityName).then((geocode) => {
        if (geocode.length > 0) {
          setRegion({
            latitude: geocode[0].latitude,
            longitude: geocode[0].longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }
      });
    }
  }, [cityName]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} title={cityName} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
});
