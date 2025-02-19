import { View, Text, ImageBackground, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import appicon from "@/assets/images/app-icon.png";

export default function Index() {
  return (
    <View style={styles.container}>
      {/* App Name at the Top */}
      <Text style={styles.appName}>FreshSense</Text>

      {/* Background Image */}
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
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 50, // Ensure text is at the top
  },
  appName: {
    position: "absolute",
    top: 20, // Position at the top
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Adds a dark background for visibility
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
    justifyContent: "space-around",
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
