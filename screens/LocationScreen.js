import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function LocationsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Locations</Text>
      <Button title="Go to Map" onPress={() => navigation.navigate("Map")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
