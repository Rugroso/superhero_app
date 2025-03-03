import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background}>
      <ScrollView style={{flex: 1, height: '100%'}} >
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>SuperApp</Text>
            <Text style={styles.subtitle}>Elige tu equipo</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#e50914' }]} onPress={() => router.push('/(tabs)/home/marvel')}>
              <Text style={styles.buttonText}>Marvel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#1b1f3b' }]} onPress={() => router.push('/(tabs)/home/dc')}>
              <Text style={styles.buttonText}>DC</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../../../assets/images/super.png')} style={styles.image} />
            </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 70,
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 18,
    color: '#d1d1d1',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    height: 100,
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  imageContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
});