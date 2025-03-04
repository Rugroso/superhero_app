import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

interface Superhero {
  _id: string;
  nombre: string;
  edad: number;
  identidad_secreta: string;
  poderes: string[];
}

interface Liga {
  _id: string;
  nombre: string;
  miembros: Superhero[]; // Aseguramos que es un array de objetos, no solo IDs
}

export default function CLigas() {
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://10.4.45.152:3000/api/liga/superhero")
      .then(async (response) => {
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error ${response.status}: ${errorMessage}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Ligas obtenidas:", data);
        setLigas(data);
      })
      .catch((err) => {
        console.error("Error al obtener las ligas:", err);
        setError(err.message);
      });
  }, []);

  const filteredLigas = ligas.filter((liga) =>
    liga.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient colors={["#0f0c29", "#302b63", "#24243e"]} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Consultar Ligas</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Buscar liga..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchbar}
              placeholderTextColor="gray"
              inputStyle={{ color: "gray" }}
            />
          </View>
          {error && <Text style={styles.errorText}>Error: {error}</Text>}
          <View style={styles.ligaList}>
            {filteredLigas.length > 0 ? (
              filteredLigas.map((liga) => (
                <View key={liga._id} style={styles.ligaContainer}>
                  <Text style={styles.ligaName}>{liga.nombre}</Text>
                  <Text style={styles.ligaDetail}>Miembros:</Text>
                  {liga.miembros.length > 0 ? (
                    liga.miembros.map((miembro) => (
                      <Text key={miembro._id} style={styles.heroName}>
                        - {miembro.nombre}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.noResults}>No hay miembros en esta liga</Text>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.noResults}>No se encontraron ligas</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    borderRadius: 15,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 20,
    borderRadius: 15,
  },
  searchContainer: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  searchbar: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  ligaList: {
    marginTop: 10,
  },
  ligaContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "rgba(245, 245, 245, 1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  ligaName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1a1a1a",
  },
  ligaDetail: {
    fontSize: 16,
    marginBottom: 3,
    color: "#333333",
  },
  heroName: {
    fontSize: 14,
    color: "#444",
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "#333333",
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginTop: 10,
  },
});