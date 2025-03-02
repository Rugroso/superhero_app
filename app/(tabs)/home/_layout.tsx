import { Stack } from 'expo-router';

export default function AppStack() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="marvel" options={{ title: 'Marvel' }} />
      <Stack.Screen name="dc" options={{ title: 'DC' }} />
    </Stack>
  );
}