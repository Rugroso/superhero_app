import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';

interface Liga {
  _id: string;
  nombre: string;
}

export default function DLiga() {
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedLiga, setSelectedLiga] = useState<string>('');
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    fetch('http://10.4.45.152:3000/api/liga/superhero')
      .then(response => response.json())
      .then((data: Liga[]) => {
        setLigas(data);
        const mappedItems = data.map(liga => ({
          label: liga.nombre,
          value: liga._id,
        }));
        setItems(mappedItems);
        if (mappedItems.length > 0) {
          setSelectedLiga(mappedItems[0].value);
        }
      })
      .catch(error => {
        console.error('Error al obtener las ligas:', error);
        Alert.alert('Error', 'No se pudieron cargar las ligas');
      });
  }, []);

  const eliminarLiga = () => {
    if (!selectedLiga) {
      Alert.alert('Seleccione una liga para eliminar');
      return;
    }
    fetch(`http://10.4.45.152:3000/api/liga/superhero/${selectedLiga}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          Alert.alert('Liga eliminada con éxito');
          const updatedLigas = ligas.filter(liga => liga._id !== selectedLiga);
          setLigas(updatedLigas);
          const mappedItems = updatedLigas.map(liga => ({
            label: liga.nombre,
            value: liga._id,
          }));
          setItems(mappedItems);
          setSelectedLiga(mappedItems.length > 0 ? mappedItems[0].value : '');
        } else {
          Alert.alert('Error', 'La liga no pudo ser eliminada');
        }
      })
      .catch(error => {
        console.error('Error al eliminar la liga:', error);
        Alert.alert('Error', 'No se pudo eliminar la liga');
      });
  };

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Eliminar Liga</Text>
          <View style={[styles.formContainer, { zIndex: 2000 }]}>
            <DropDownPicker
              open={open}
              value={selectedLiga}
              items={items}
              setOpen={setOpen}
              setValue={setSelectedLiga}
              setItems={setItems}
              placeholder="Seleccione una liga"
              containerStyle={styles.pickerContainer}
              style={styles.picker}
              dropDownContainerStyle={styles.dropDownContainer}
              keyboardShouldPersistTaps="handled"
            />
            <TouchableOpacity style={styles.button} onPress={eliminarLiga}>
              <Text style={styles.buttonText}>Eliminar Liga</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    zIndex: 2000,
  },
  pickerContainer: {
    marginVertical: 10,
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
