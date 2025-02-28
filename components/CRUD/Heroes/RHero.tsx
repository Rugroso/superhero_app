import { StyleSheet, View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Searchbar } from 'react-native-paper';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

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
        fetch('http://10.4.94.184:3001/api/superhero')
            .then(response => response.json())
            .then(data => {
                setSuperheroes(data); 
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Filtrar superhéroes según el texto de búsqueda
    const filteredSuperheroes = superheroes.filter(superhero =>
        superhero.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        superhero.identidad_secreta.toLowerCase().includes(searchQuery.toLowerCase()) ||
        superhero.poderes.some(poder => poder.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
      <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView  style={styles.scrollContainer}>
            <View>
                <Text style={styles.centralText}>  
                    Hora de consultar un superhéroe
                </Text>
            </View>
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Buscar superhéroe..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
            </View>
            <View style={styles.inputContainer}>  
                {filteredSuperheroes.length > 0 ? (
                    filteredSuperheroes.map((superhero) => (
                        <View key={superhero._id} style={styles.heroContainer}>
                            <Text style={styles.heroName}>{superhero.nombre}</Text>
                            <Text>Edad: {superhero.edad}</Text>
                            <Text>Identidad Secreta: {superhero.identidad_secreta}</Text>
                            <Text>Poderes: {superhero.poderes.join(', ')}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noResults}>No se encontraron superhéroes</Text>
                )}
            </View>
        </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>

    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#fff',
        padding: 10
    },
    searchContainer: {
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    inputContainer: {
        margin: 10
    },
    centralText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    },
    heroContainer: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    heroName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    noResults: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20
    }
});