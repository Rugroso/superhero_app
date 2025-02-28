import { StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-paper';
import React from 'react';

export default function CHero() {
    const [nombre, setNombre] = React.useState("");
    const [edad, setEdad] = React.useState("");
    const [liga, setLiga] = React.useState("");
    const [poderes, setPoderes] = React.useState("");
  return (
    <ScrollView style={styles.scrollContainer}>
    <View>
        <View> 
            <Text style={styles.centralText}>  
                Hora de modificar los datos de un superheroe
            </Text>
        </View>
        <View style={styles.inputContainer}>  
            <TextInput
            mode= 'outlined'
            label="Nombre"
            value={nombre}
            onChangeText={text => setNombre(text)}
            />
        </View>
        <View style={styles.inputContainer}>  
            <TextInput
            mode= 'outlined'
            label="Liga"
            value={liga}
            onChangeText={text => setLiga(text)}
            />
        </View>
        <View style={styles.inputContainer}>  
            <TextInput
            mode= 'outlined'
            label="Edad"
            value={edad}
            onChangeText={text => setEdad(text)}
            />
        </View>
        <Text style={styles.poderText}> 
            Separa los poderes por comas
        </Text>
        <View style={styles.inputContainer}>  
            <TextInput
            mode= 'outlined'
            label="Poderes"
            value={poderes}
            onChangeText={text => setPoderes(text)}
            />
        </View>
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    display : 'flex',
    backgroundColor: '#fff',
  },
  inputContainer: {
    margin:10
  },
  poderText: {
    fontSize:16,
    marginLeft:13,
    marginTop:8,
    fontWeight:'500'
  },
  headContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    backgroundColor: '#d4d2cd',
    borderRadius: 10,
  },
  upperLeagueContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    flexWrap: 'wrap'
  },
  leagueContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
    width: 200,
    backgroundColor: '#d4d2cd',
    borderRadius: 25,
    margin: 10
  },
  centralText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  }
});
