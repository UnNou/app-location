import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function CountryScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase()) ||
      (country.capital && country.capital[0].toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Countries & Capitals</Text>
      <TextInput
        style={styles.input}
        placeholder="Type country or capital..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.cca3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Map", {
                cityName: item.capital ? item.capital[0] : item.name.common,
              })
            }
          >
            <Image source={{ uri: item.flags.png }} style={styles.flag} />
            <View>
              <Text style={styles.countryName}>{item.name.common}</Text>
              <Text style={styles.capital}>
                Capital: {item.capital ? item.capital[0] : "N/A"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  item: { flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1 },
  flag: { width: 50, height: 30, marginRight: 10 },
  countryName: { fontSize: 16, fontWeight: "bold" },
  capital: { fontSize: 14, color: "#555" },
});
