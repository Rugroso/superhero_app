import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
  miembros: Superhero[];
}

export default function DcLeague() {
  const [liga, setLiga] = useState<Liga | null>(null);
  const marvelLeagueId = "67c105c75b86923173f0f76b";

  useEffect(() => {
    fetch(`http://localhost:3000/api/liga/superhero/${marvelLeagueId}`)
      .then(response => response.json())
      .then((data: Liga) => {
        setLiga(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {liga ? (
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>{liga.nombre}</Text>
            </View>
            <View style={styles.listContainer}>
              {liga.miembros.length > 0 ? (
                liga.miembros.map(member => (
                  <View key={member._id} style={styles.heroContainer}>
                    <Text style={styles.heroName}>{member.nombre}</Text>
                    <Text style={styles.heroDetail}>Edad: {member.edad}</Text>
                    <Text style={styles.heroDetail}>
                      Identidad Secreta: {member.identidad_secreta}
                    </Text>
                    <Text style={styles.heroDetail}>
                      Poderes: {member.poderes.join(', ')}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noResults}>
                  No hay miembros en esta liga.
                </Text>
              )}
            </View>
          </>
        ) : (
          <Text style={styles.noResults}>Cargando datos de la liga...</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  listContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 20,
    borderRadius: 15,
  },
  heroContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  heroName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1a1a1a',
  },
  heroDetail: {
    fontSize: 16,
    marginBottom: 3,
    color: '#333333',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    marginTop: 20,
  },
});