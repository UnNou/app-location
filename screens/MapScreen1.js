import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen1({ route }) {
  const [region, setRegion] = useState(null); // Start with no location
  const { cityName } = route.params || {};

  useEffect(() => {
    if (cityName) {
      (async () => {
        const geocode = await Location.geocodeAsync(cityName);
        if (geocode.length > 0) {
          setRegion({
            latitude: geocode[0].latitude,
            longitude: geocode[0].longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }
      })();
    }
  }, [cityName]);

  return (
    <View style={styles.container}>
      {region ? (
        <MapView style={styles.map} region={region}>
          <Marker coordinate={region} title={cityName} />
        </MapView>
      ) : (
        <Text style={styles.loading}>Loading map...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  loading: { flex: 1, textAlign: "center", marginTop: 50, fontSize: 18 },
});
