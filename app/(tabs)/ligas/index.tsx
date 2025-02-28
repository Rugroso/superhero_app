import { Image, StyleSheet, Platform, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.scrollContainer}>
        <View style={styles.headContainer}>
            <Text style={styles.centralText}>
                Gestión de Ligas
            </Text>
        </View>
        <View style={[styles.upperLeagueContainer]}>
          <TouchableOpacity style={[styles.leagueContainer]} onPress={() => router.push('/(tabs)/superheroes/crud')}>
              <Text style={[styles.centralText]}>
                Consultar una Liga
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.leagueContainer]} onPress={() => router.push('/(tabs)/superheroes/crud')}>
              <Text style={[styles.centralText]}>
                Editar una Liga
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.leagueContainer]} onPress={() => router.push('/(tabs)/superheroes/crud')}>
              <Text style={[styles.centralText]}>
                Crear una Liga
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.leagueContainer]} onPress={() => router.push('/(tabs)/superheroes/crud')}>
              <Text style={[styles.centralText]}>
                Eliminar una Liga
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
