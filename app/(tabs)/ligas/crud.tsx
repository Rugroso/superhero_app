import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CLeague from '@/components/CRUD/Ligas/CLeague';
import RLeague from '@/components/CRUD/Ligas/RLeague';
import ULeague from '@/components/CRUD/Ligas/ULeague';
import DLeague from '@/components/CRUD/Ligas/DLeague';

export default function HomeScreen() {
  const route = useRoute();
  const [category, setCategory] = React.useState('');

  React.useEffect(() => {
    const { categoryParam } = route.params as { categoryParam: string };
    console.log("categoryParam:", categoryParam);
    setCategory(categoryParam);
  }, []);

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Gestión de Ligas</Text>
        </View>
        <View style={styles.contentContainer}>
          {category === 'consultar' && <RLeague />}
          {category === 'editar' && <ULeague />}
          {category === 'crear' && <CLeague />}
          {category === 'eliminar' && <DLeague />}
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#d1d1d1',
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
  },
});