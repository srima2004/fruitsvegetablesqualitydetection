import { View, ImageBackground, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; // Import icons
import appicon from "@/assets/images/app-icon.png";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>FreshSense</Text>

      <ImageBackground source={appicon} resizeMode="cover" style={styles.image} />

      {/* Bottom Navigation Icons */}
      <View style={styles.bottomNav}>
        <Link href="/screens/HomeScreen" asChild>
          <Pressable>
            <Icon name="home" size={35} color="caramel" />

          </Pressable>
        </Link>

        <Link href="/screens/Login" asChild>
          <Pressable>
            <Icon name="user" size={35} color="caramel" />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  appName: {
    position: "absolute",
    top: 20, // Position at the top
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Optional: Adds a dark background for visibility
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
