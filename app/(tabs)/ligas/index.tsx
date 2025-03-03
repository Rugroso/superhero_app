import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Gestión de Ligas</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/ligas/crud",
                params: { categoryParam: 'consultar' }
              })
            }
          >
            <Text style={styles.buttonText}>Consultar una Liga</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/ligas/crud",
                params: { categoryParam: 'editar' }
              })
            }
          >
            <Text style={styles.buttonText}>Editar una Liga</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/ligas/crud",
                params: { categoryParam: 'crear' }
              })
            }
          >
            <Text style={styles.buttonText}>Crear una Liga</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/ligas/crud",
                params: { categoryParam: 'eliminar' }
              })
            }
          >
            <Text style={styles.buttonText}>Eliminar Liga</Text>
          </TouchableOpacity>
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
    marginTop: 70,

  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#1b1f3b',
    width: '44%',
    height: 120,
    borderRadius: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});