import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="secret"
        options={{
          headerTitle: "Secret Flag",
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}