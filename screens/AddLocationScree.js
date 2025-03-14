import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AddLocationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Location</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
