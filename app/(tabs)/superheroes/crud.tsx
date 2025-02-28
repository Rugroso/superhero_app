import { Image, StyleSheet, Platform, View, Text, ScrollView, TouchableOpacity} from 'react-native'
import { useRoute } from '@react-navigation/native';
import React from 'react'; 
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
  }
  , []);
  return (
    <ScrollView style={styles.scrollContainer}>
        <View> 
          {category === 'consultar' && <RHero></RHero>}
          {category === 'editar' && <UHero></UHero>}
          {category === 'crear' && <CHero></CHero>}
          {category === 'eliminar' && <DHero></DHero>}
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
