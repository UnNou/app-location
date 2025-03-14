import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function LocationScreen1({ navigation }) {
  const [locations, setLocations] = useState([]); // state to hold the locations from firebase

  // listen for real-time changes in the Firestore "locations" collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "locations"), (snapshot) => {
      const locationsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLocations(locationsList); // update the state with the fetched locations
    });

    return () => unsubscribe();
  }, []);
  
  // some styiling added
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locations</Text>
      {/* */}
      <Button 
        title="Add Location" 
        onPress={() => navigation.navigate("Add Location")} 
        color="#28a745"
      />
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "rgba(0, 0, 0, 0.1)", 
              marginVertical: 5,
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.5,
              elevation: 5, 
            }}
            onPress={() => navigation.navigate("Map", { cityName: item.name })}
          >
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            
            {/* */}
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 18, fontWeight: "bold" },
  desc: { fontSize: 14, color: "#555" },
  rating: { fontSize: 14, color: "gold" },

  ratingContainer: {
    padding: 8,
    backgroundColor: "#333",
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
});
