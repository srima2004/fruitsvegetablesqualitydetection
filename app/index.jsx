import { View, Text, StyleSheet, ImageBackground, Pressable } from "react-native";
import { Link } from "expo-router";
import appicon from "@/assets/images/app-icon.png";

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground source={appicon} resizeMode="cover" style={styles.image}>
        <Link href="/screens/HomeScreen" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Go to Home</Text>
          </Pressable>
        </Link>

        <Link href="/screens/Login" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Go to Login</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
