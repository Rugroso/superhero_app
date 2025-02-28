import { Image, StyleSheet, Platform, View, Text, ScrollView, TouchableOpacity} from 'react-native'
import { useRoute } from '@react-navigation/native';
import React from 'react'; 
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
  }
  , []);
  return (
    <ScrollView style={styles.scrollContainer}>
        <View> 
          {category === 'consultar' && <RLeague></RLeague>}
          {category === 'editar' && <ULeague></ULeague>}
          {category === 'crear' && <CLeague></CLeague>}
          {category === 'eliminar' && <DLeague></DLeague>}
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
