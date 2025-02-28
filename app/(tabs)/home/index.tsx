import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scrollContainer}>
        <View style={styles.headContainer}>
            <Text style={styles.centralText}>
                Bienvenido a la Liga de Heroes
            </Text>
        </View>
        <View style={[styles.upperLeagueContainer]}>
          <TouchableOpacity style={[styles.leagueContainer, , { backgroundColor: "#D40317" }]}>
              <Text style={[styles.centralText, {color: "#fff"}]}>
                  Marvel
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.leagueContainer, , { backgroundColor: "#010101" }]}>
              <Text style={[styles.centralText, {color: "#fff"}]}>
                  DC
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
