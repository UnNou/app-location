import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AddLocationScreen({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  async function addLocation() {
    if (!name || !description || !rating) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    try {
      await addDoc(collection(db, "locations"), {
        name,
        description,
        rating: parseInt(rating),
      });

      Alert.alert("Success", "Location added!");
      navigation.navigate("Locations"); // Go back to list
    } catch (error) {
      Alert.alert("Error", "Could not save location.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Location</Text>
      <TextInput style={styles.input} placeholder="City Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Rating (1-5)" value={rating} onChangeText={setRating} keyboardType="numeric" />
      <Button title="Add" onPress={addLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, width: "80%", marginBottom: 10, borderRadius: 5 },
});
