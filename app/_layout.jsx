import { Stack } from "expo-router";
import { StoriesProvider } from "./context/StoriesContext";

export default function RootLayout() {
  return (
    <StoriesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
      </Stack>
    </StoriesProvider>
  );
}
