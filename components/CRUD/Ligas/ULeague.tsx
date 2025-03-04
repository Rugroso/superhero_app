import React, { useEffect, useState } from "react"; 
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

interface Superhero {
  _id: string;
  nombre: string;
}

interface Liga {
  _id: string;
  nombre: string;
  miembros: Superhero[];
}

export default function EditarLiga() {
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLiga, setSelectedLiga] = useState<Liga | null>(null);
  const [newHero, setNewHero] = useState("");

  useEffect(() => {
    fetch("http://10.4.45.152:3000/api/liga/superhero")
      .then((response) => response.json())
      .then((data) => setLigas(data))
      .catch((err) => Alert.alert("Error", "No se pudieron obtener las ligas."));
  }, []);

  const filteredLigas = ligas.filter((liga) =>
    liga.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLiga = (liga: Liga) => setSelectedLiga({ ...liga });

  const handleAddHero = () => {
    if (!newHero.trim() || !selectedLiga) return;

    const nuevoMiembro: Superhero = { _id: Date.now().toString(), nombre: newHero };
    const updatedLiga = { ...selectedLiga, miembros: [...selectedLiga.miembros, nuevoMiembro] };

    setSelectedLiga(updatedLiga);
    setNewHero("");
  };

  const handleRemoveHero = (heroId: string) => {
    if (!selectedLiga) return;
    const updatedLiga = { ...selectedLiga, miembros: selectedLiga.miembros.filter((m) => m._id !== heroId) };

    setSelectedLiga(updatedLiga);
  };

  const handleSaveChanges = async () => {
    if (!selectedLiga) return;

    try {
      const response = await fetch(`http://10.4.45.152:3000/api/liga/${selectedLiga._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ miembros: selectedLiga.miembros }),
      });

      if (!response.ok) throw new Error("Error en la actualización");

      const updatedLigas = ligas.map((liga) =>
        liga._id === selectedLiga._id ? selectedLiga : liga
      );
      setLigas(updatedLigas);
      setSelectedLiga(null);
      Alert.alert("Éxito", "Liga actualizada correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudieron guardar los cambios.");
    }
  };

  return (
    <LinearGradient colors={["#0f0c29", "#302b63", "#24243e"]} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Editar Liga</Text>
        </View>
        {!selectedLiga ? (
          <View style={styles.formContainer}>
            <Searchbar
              placeholder="Buscar liga..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchbar}
            />
            {filteredLigas.map((liga) => (
              <TouchableOpacity key={liga._id} style={styles.ligaContainer} onPress={() => handleSelectLiga(liga)}>
                <Text style={styles.ligaName}>{liga.nombre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.ligaTitle}>Editando: {selectedLiga.nombre}</Text>
            <Text style={styles.ligaDetail}>Miembros:</Text>
            {selectedLiga.miembros.map((miembro) => (
              <View key={miembro._id} style={styles.heroRow}>
                <Text style={styles.heroName}>{miembro.nombre}</Text>
                <TouchableOpacity onPress={() => handleRemoveHero(miembro._id)}>
                  <Text style={styles.removeButton}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TextInput
              style={styles.input}
              placeholder="Nuevo héroe..."
              value={newHero}
              onChangeText={setNewHero}
            />
            <Button mode="contained" onPress={handleAddHero} style={styles.addButton}>
              Agregar Héroe
            </Button>
            <Button mode="contained" onPress={handleSaveChanges} style={styles.saveButton}>
              Guardar Cambios
            </Button>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flexGrow: 1, padding: 20, paddingBottom: 80 },
  headerContainer: { alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#ffffff" },
  formContainer: { backgroundColor: "rgba(255, 255, 255, 0.95)", padding: 20, borderRadius: 15 },
  searchbar: { marginBottom: 15, borderRadius: 10 },
  ligaContainer: { padding: 15, marginBottom: 10, backgroundColor: "rgba(245, 245, 245, 1)", borderRadius: 10, borderWidth: 1, borderColor: "#ddd" },
  ligaName: { fontSize: 18, fontWeight: "bold" },
  ligaTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  ligaDetail: { fontSize: 16, marginBottom: 5 },
  heroRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 },
  heroName: { fontSize: 16 },
  removeButton: { color: "red", fontWeight: "bold" },
  input: { backgroundColor: "#f0f0f0", padding: 10, borderRadius: 8, marginTop: 10 },
  addButton: { marginTop: 10 },
  saveButton: { marginTop: 20, backgroundColor: "#4CAF50" },
});
