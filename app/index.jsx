import { View, Animated, ImageBackground, Pressable, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; 
import appicon from "@/assets/images/app-icon.png";

export default function Index() {
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Starts at 50% size
  const opacityAnim = useRef(new Animated.Value(0)).current; // Icons start invisible

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1, // Zoom to normal size
        duration: 1000, // 1 sec zoom-in
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1, // Fade in icons
        duration: 500, // 0.5 sec fade-in
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* App Icon with Zoom Animation */}
      <Animated.Image 
        source={appicon} 
        style={[styles.image, { transform: [{ scale: scaleAnim }] }]} 
        resizeMode="cover" 
      />

      {/* Bottom Navigation Icons with Fade-in Effect */}
      <Animated.View style={[styles.bottomNav, { opacity: opacityAnim }]}>
        <Link href="/screens/HomeScreen" asChild>
          <Pressable>
            <Icon name="home" size={30} color="#D2691E" />
          </Pressable>
        </Link>

        <Link href="/screens/Login" asChild>
          <Pressable>
            <Icon name="user" size={30} color="#D2691E" />
          </Pressable>
        </Link>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Black background for better visibility
  },
  image: {
    width: 200, // Adjusted size
    height: 200, // Adjusted size
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
});
