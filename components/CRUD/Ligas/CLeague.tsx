import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

export default function CLiga() {
  const [nombre, setNombre] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [selectedHeroes, setSelectedHeroes] = useState({});

  useEffect(() => {
    fetch("http://10.4.45.152:3000/api/superhero")
      .then((response) => response.json())
      .then((data) => {
        setHeroes(data);
        const initialSelections = {};
        data.forEach(hero => {
          initialSelections[hero._id] = false;
        });
        setSelectedHeroes(initialSelections);
      })
      .catch((error) => console.error("Error al obtener héroes:", error));
  }, []);

  const toggleHeroSelection = (heroId) => {
    setSelectedHeroes((prevSelected) => ({
      ...prevSelected,
      [heroId]: !prevSelected[heroId],
    }));
  };

  const registrarLiga = async () => {
    if (!nombre.trim()) {
      Alert.alert("Error", "Por favor, ingresa el nombre de la liga.");
      return;
    }

    const miembrosArray = Object.keys(selectedHeroes).filter(id => selectedHeroes[id]);
    if (miembrosArray.length === 0) {
      Alert.alert("Error", "Debe seleccionar al menos un héroe para la liga.");
      return;
    }

    try {
      const response = await fetch("http://10.4.45.152:3000/api/liga/superhero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, miembros: miembrosArray }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      Alert.alert("Éxito", "Liga registrada con éxito.");
      setNombre("");
      setSelectedHeroes({});
    } catch (error) {
      console.error("Error al registrar la liga:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <LinearGradient colors={["#0f0c29", "#302b63", "#24243e"]} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Nueva Liga</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            label="Nombre de la Liga"
            value={nombre}
            onChangeText={setNombre}
            textColor={"#000000"}
            theme={{ colors: { text: "black", primary: "#6200EE", background: "white" } }}
          />
          <Text style={styles.subTitle}>Selecciona los héroes:</Text>
          {heroes.map((hero) => (
            <View key={hero._id} style={styles.checkboxContainer}>
              <Checkbox
                status={selectedHeroes[hero._id] ? "checked" : "unchecked"}
                onPress={() => toggleHeroSelection(hero._id)}
              />
              <Text style={styles.checkboxLabel}>{hero.nombre}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={registrarLiga}>
            <Text style={styles.buttonText}>Registrar Liga</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flexGrow: 1, padding: 20 },
  headerContainer: { alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#ffffff" },
  formContainer: { backgroundColor: "rgba(255, 255, 255, 0.95)", padding: 20, borderRadius: 15 },
  subTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  checkboxLabel: { fontSize: 16, marginLeft: 8 },
  button: { backgroundColor: "#f0c14b", borderRadius: 25, marginTop: 20, padding: 12, alignItems: "center" },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#000" },
});
