import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function CHero() {
  const [nombre, setNombre] = React.useState("");
  const [edad, setEdad] = React.useState("");
  const [identidadSecreta, setIdentidadSecreta] = React.useState("");
  const [poderes, setPoderes] = React.useState("");

  const registrarHeroe = () => {
    console.log("Nombre:", nombre);
    console.log("Edad:", edad);
    console.log("Identidad Secreta:", identidadSecreta);
    console.log("Poderes:", poderes);
    fetch('http://localhost:3000/api/superhero', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: nombre,
        edad: parseInt(edad),
        identidad_secreta: identidadSecreta,
        poderes: poderes.split(',').map(p => p.trim())
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        Alert.alert("Héroe registrado con éxito");
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'El Héroe no pudo ser registrado', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]);
      });
  };

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Nuevo Superhéroe</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Identidad Secreta"
              value={identidadSecreta}
              onChangeText={setIdentidadSecreta}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Edad"
              value={edad}
              onChangeText={setEdad}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.poderText}>Separa los poderes por comas</Text>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Poderes"
              value={poderes}
              onChangeText={setPoderes}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={registrarHeroe}>
            <Text style={styles.buttonText}>Registrar Héroe</Text>
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
  inputContainer: {
    marginVertical: 10,
  },
  poderText: {
    fontSize: 16,
    marginLeft: 13,
    marginTop: 8,
    fontWeight: '500',
    color: '#333',
  },
  button: {
    backgroundColor: '#f0c14b',
    borderRadius: 25,
    marginTop: 20,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
});