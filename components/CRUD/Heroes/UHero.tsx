import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';

// Interfaz para tipar los datos de un superhéroe
interface Superhero {
  _id: string;
  nombre: string;
  edad: number;
  identidad_secreta: string;
  poderes: string[];
}

export default function EHero() {
  const [heroes, setHeroes] = useState<Superhero[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedHero, setSelectedHero] = useState<string>(""); // Guarda el _id del héroe seleccionado
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);

  // Campos del formulario para editar
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [identidadSecreta, setIdentidadSecreta] = useState("");
  const [poderes, setPoderes] = useState("");

  // Cargar la lista de superhéroes
  useEffect(() => {
    fetch('http://localhost:3000/api/superhero')
      .then(response => response.json())
      .then((data: Superhero[]) => {
        setHeroes(data);
        const mappedItems = data.map(hero => ({
          label: hero.nombre,
          value: hero._id,
        }));
        setItems(mappedItems);
        if (mappedItems.length > 0) {
          setSelectedHero(mappedItems[0].value);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedHero) {
      const hero = heroes.find(h => h._id === selectedHero);
      if (hero) {
        setNombre(hero.nombre);
        setEdad(String(hero.edad));
        setIdentidadSecreta(hero.identidad_secreta);
        setPoderes(hero.poderes.join(', '));
      }
    }
  }, [selectedHero, heroes]);

  const editarHeroe = () => {
    console.log("ID:", selectedHero);
    console.log("Nombre:", nombre);
    console.log("Edad:", edad);
    console.log("Identidad Secreta:", identidadSecreta);
    console.log("Poderes:", poderes);
    fetch(`http://localhost:3000/api/superhero/${selectedHero}`, {
      method: 'PUT',
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
        Alert.alert("Héroe editado con éxito");
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'El Héroe no pudo ser editado', [
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
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Editar Superhéroe</Text>
        </View>
        <View style={styles.formContainer}>
          <DropDownPicker
            open={open}
            value={selectedHero}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedHero}
            setItems={setItems}
            placeholder="Seleccione un héroe"
            containerStyle={styles.pickerContainer}
            style={styles.picker}
            dropDownContainerStyle={styles.dropDownContainer}
          />
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
          <TouchableOpacity style={styles.button} onPress={editarHeroe}>
            <Text style={styles.buttonText}>Editar Héroe</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  pickerContainer: {
    marginVertical: 10,
    zIndex: 1000,
  },
  picker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  dropDownContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
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