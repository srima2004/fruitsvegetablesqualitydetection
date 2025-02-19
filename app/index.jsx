import { View, ImageBackground, Pressable, StyleSheet, Text } from "react-native"; 
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; 
import appicon from "../assets/images/app-icon.png"; // Use relative path

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground source={appicon} resizeMode="cover" style={styles.image}>
        {/* App Name */}
        <Text style={styles.appName}>FreshSense</Text>
      </ImageBackground>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Link href="/HomeScreen" asChild>
          <Pressable>
            <Icon name="home" size={35} color="#D2691E" /> 
          </Pressable>
        </Link>

        <Link href="/Login" asChild>
          <Pressable>
            <Icon name="user" size={35} color="#D2691E" />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Ensure background is visible
  },
  appName: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },  
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingVertical: 10,
  },
});
