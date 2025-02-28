import { StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.scrollContainer}>
        <View style={styles.headContainer}>
            <Text style={styles.centralText}>
                Gestión de Heroes
            </Text>
        </View>
        <View style={[styles.upperLeagueContainer]}>
    

          <TouchableOpacity style={[styles.leagueContainer]} onPress={() => router.push({ pathname: "/(tabs)/superheroes/crud", params: { categoryParam: 'consultar' } })}>
              <Text style={[styles.centralText]}>
                Consultar un Heroe
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.leagueContainer]} onPress={() => router.push({ pathname: "/(tabs)/superheroes/crud", params: { categoryParam: 'editar' } })}>
              <Text style={[styles.centralText]}>
                Editar un Heroe
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.leagueContainer]} onPress={() => router.push({ pathname: "/(tabs)/superheroes/crud", params: { categoryParam: 'crear' } })}>
              <Text style={[styles.centralText]}>
                Crear un Heroe
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.leagueContainer]} onPress={() => router.push({ pathname: "/(tabs)/superheroes/crud", params: { categoryParam: 'eliminar' } })}>
              <Text style={[styles.centralText]}>
                Eliminar Heroe
              </Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    display : 'flex',
    backgroundColor: '#fff',
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
