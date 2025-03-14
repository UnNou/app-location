import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AddLocationScreen({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  async function addLocation() {
    if (!name || !description || !rating) return; // validate input fields

    // add the new location to Firebase Firestore
    await addDoc(collection(db, "locations"), {
      name,
      description,
      rating: parseInt(rating),
    });
    // navigate back to the Locations screen after adding
    navigation.navigate("Locations");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Location</Text>
      <TextInput 
        style={styles.input} 
        placeholder="City Name" 
        value={name} 
        onChangeText={setName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Description" 
        value={description} 
        onChangeText={setDescription} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Rating (1-5)" 
        value={rating} 
        onChangeText={setRating} 
        keyboardType="numeric" 
      />
      <TouchableOpacity style={styles.addButton} onPress={addLocation}>
        <Text style={styles.addButtonText}>Add Location</Text>
      </TouchableOpacity>
    </View>
  );
}
// styling
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#F8F8F8" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" },
  input: { 
    borderWidth: 1, 
    padding: 12, 
    width: "80%", 
    marginBottom: 15, 
    borderRadius: 8, 
    backgroundColor: "#fff", 
    borderColor: "#ddd", 
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "80%",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
