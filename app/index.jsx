import { View, Animated, Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import { useEffect, useRef } from "react";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; 
import { LinearGradient } from "expo-linear-gradient"; // ✅ Correct Expo import
import appicon from "@/assets/images/app-icon.png";

export default function Index() {
  const textScaleAnim = useRef(new Animated.Value(0.5)).current;
  const textOpacityAnim = useRef(new Animated.Value(0)).current;
  const bottomNavOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(textScaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacityAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(bottomNavOpacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={["#000000", "#432c1a"]} style={styles.container}>
      <Animated.Text 
        style={[
          styles.appName, 
          { 
            transform: [{ scale: textScaleAnim }],
            opacity: textOpacityAnim,
          }
        ]}
      >
        FreshSense
      </Animated.Text>

      <ImageBackground 
        source={appicon} 
        style={styles.image} 
        resizeMode="cover" 
      />

      <Animated.View style={[styles.bottomNav, { opacity: bottomNavOpacityAnim }]}>
        <Link href="/screens/HomeScreen" asChild>
          <Pressable>
            <Icon name="home" size={35} color="#ecd4bf" />
          </Pressable>
        </Link>

        <Link href="/screens/Login" asChild>
          <Pressable>
            <Icon name="user" size={35} color="#ecd4bf" />
          </Pressable>
        </Link>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ecd4bf",
    textAlign: "center",
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 3, height: 3 },
    letterSpacing: 2,
    position: "absolute",
    top: 150,
  },
  image: {
    width: 200,
    height: 200,
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
