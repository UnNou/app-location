import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen1({ route }) {
  const [region, setRegion] = useState(null);
  const { cityName } = route.params || {};

  useEffect(() => {
    if (cityName) {
      Location.geocodeAsync(cityName)
        .then((locations) => {
          if (locations.length > 0) {
            setRegion({
              latitude: locations[0].latitude,
              longitude: locations[0].longitude,
              latitudeDelta: 5,
              longitudeDelta: 5,
            });
          }
        })
        .catch((error) => console.error("Geocoding error:", error));
    }
  }, [cityName]);

  return (
    <View style={styles.container}>
      {region ? (
        <MapView style={styles.map} region={region}>
          <Marker coordinate={region} title={cityName} />
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
