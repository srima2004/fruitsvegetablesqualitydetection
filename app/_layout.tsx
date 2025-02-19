import { Stack } from "expo-router";
import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
        <Stack.Screen name="screens/HomeScreen" options={{ title: "Home" ,headerShown: false}} />
        <Stack.Screen name="screens/Login" options={{ title: "Login",headerShown: false }} />
        <Stack.Screen name="screens/Signup" options={{ title: "Signup",headerShown: false }}/>
        <Stack.Screen name="not-found" options={{ title: "Not Found",headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
