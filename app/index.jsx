import { View, ImageBackground, Pressable, StyleSheet, Text } from "react-native"; 
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; 
import appicon from "../assets/images/app-icon.png"; // Ensure the path is correct

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Background Image with proper scaling */}
      <ImageBackground source={appicon} resizeMode="contain" style={styles.image}>
        {/* Elegant App Name */}
        <View style={styles.appTitleContainer}>
          <Text style={styles.appName}>FreshSense</Text>
        </View>
      </ImageBackground>

      {/* Bottom Navigation with refined styling */}
      <View style={styles.bottomNav}>
        <Link href="/HomeScreen" asChild>
          <Pressable style={styles.navButton}>
            <Icon name="home" size={30} color="white" />
            <Text style={styles.navText}>Home</Text>
          </Pressable>
        </Link>

        <Link href="/Login" asChild>
          <Pressable style={styles.navButton}>
            <Icon name="user" size={30} color="white" />
            <Text style={styles.navText}>Login</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background for contrast
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  appTitleContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Soft overlay
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
  appName: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFD700", // Gold color for elegance
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
    textShadowColor: "rgba(255, 215, 0, 0.6)", // Gold glow effect
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navButton: {
    alignItems: "center",
  },
  navText: {
    fontSize: 14,
    color: "white",
    marginTop: 5,
  },
});
