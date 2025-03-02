import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

interface Superhero {
  _id: string;
  nombre: string;
  edad: number;
  identidad_secreta: string;
  poderes: string[];
}

export default function CHero() {
  const [superheroes, setSuperheroes] = React.useState([] as Superhero[]);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    fetch('http://localhost:3000/api/superhero')
      .then(response => response.json())
      .then(data => {
        setSuperheroes(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const filteredSuperheroes = superheroes.filter(superhero =>
    superhero.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    superhero.identidad_secreta.toLowerCase().includes(searchQuery.toLowerCase()) ||
    superhero.poderes.some(poder => poder.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Consultar Superhéroe</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Buscar superhéroe..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchbar}
            />
          </View>
          <View style={styles.heroList}>
            {filteredSuperheroes.length > 0 ? (
              filteredSuperheroes.map((superhero) => (
                <View key={superhero._id} style={styles.heroContainer}>
                  <Text style={styles.heroName}>{superhero.nombre}</Text>
                  <Text style={styles.heroDetail}>Edad: {superhero.edad}</Text>
                  <Text style={styles.heroDetail}>Identidad: {superhero.identidad_secreta}</Text>
                  <Text style={styles.heroDetail}>Poderes: {superhero.poderes.join(', ')}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noResults}>No se encontraron superhéroes</Text>
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
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom:80
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
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
    backgroundColor: '#f0f0f0',
  },
  heroList: {
    marginTop: 10,
  },
  heroContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, 
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
    color: '#333333',
    marginTop: 20,
  },
});