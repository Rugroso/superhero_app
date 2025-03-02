import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CHero from '@/components/CRUD/Heroes/CHero';
import RHero from '@/components/CRUD/Heroes/RHero';
import UHero from '@/components/CRUD/Heroes/UHero';
import DHero from '@/components/CRUD/Heroes/DHero';

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
          <Text style={styles.headerTitle}>Gestión de Héroes</Text>
        </View>
        <View style={styles.contentContainer}>
          {category === 'consultar' && <RHero />}
          {category === 'editar' && <UHero />}
          {category === 'crear' && <CHero />}
          {category === 'eliminar' && <DHero />}
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