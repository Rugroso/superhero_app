import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';

interface Superhero {
  _id: string;
  nombre: string;
  edad: number;
  identidad_secreta: string;
  poderes: string[];
}

export default function DHero() {
  const [heroes, setHeroes] = useState<Superhero[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedHero, setSelectedHero] = useState<string>('');
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);

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

  const eliminarHeroe = () => {
    if (!selectedHero) {
      Alert.alert('Seleccione un héroe para eliminar');
      return;
    }
    fetch(`http://localhost:3000/api/superhero/${selectedHero}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          Alert.alert("Héroe eliminado con éxito");
          const updatedHeroes = heroes.filter(hero => hero._id !== selectedHero);
          setHeroes(updatedHeroes);
          const mappedItems = updatedHeroes.map(hero => ({
            label: hero.nombre,
            value: hero._id,
          }));
          setItems(mappedItems);
          setSelectedHero(mappedItems.length > 0 ? mappedItems[0].value : '');
        } else {
          Alert.alert("Error", "El héroe no pudo ser eliminado");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert("Error", "El héroe no pudo ser eliminado");
      });
  };

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Eliminar Superhéroe</Text>
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
          <TouchableOpacity style={styles.button} onPress={eliminarHeroe}>
            <Text style={styles.buttonText}>Eliminar Héroe</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
  button: {
    backgroundColor: 'red',
    borderRadius: 25,
    marginTop: 20,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});