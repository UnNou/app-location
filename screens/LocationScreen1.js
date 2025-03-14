import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function LocationScreen1({ navigation }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "locations"), (snapshot) => {
      const locationsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLocations(locationsList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locations</Text>
      <Button title="Add Location" onPress={() => navigation.navigate("Add Location")} />
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Map", { cityName: item.name })}
          >
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  item: { padding: 15, backgroundColor: "#ddd", marginVertical: 5, borderRadius: 5 },
  text: { fontSize: 18, fontWeight: "bold" },
  desc: { fontSize: 14, color: "#555" },
  rating: { fontSize: 14, color: "gold" },
});
