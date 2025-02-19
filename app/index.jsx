import { View, Animated, Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import { useEffect, useRef } from "react";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; 
import appicon from "@/assets/images/app-icon.png";
import LinearGradient from "react-native-linear-gradient";

export default function Index() {
  const textScaleAnim = useRef(new Animated.Value(0.5)).current; // Text starts small
  const textOpacityAnim = useRef(new Animated.Value(0)).current; // Text starts invisible
  const bottomNavOpacityAnim = useRef(new Animated.Value(0)).current; // Bottom icons invisible

  useEffect(() => {
    Animated.sequence([
      // Step 1: "FreshSense" text animation (Scale Up + Fade In)
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
      // Step 2: Bottom Navigation Icons Fade In
      Animated.timing(bottomNavOpacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated "FreshSense" Text with Gradient */}
      <LinearGradient 
        colors={["#ecd4bf", "#c9a17f"]} // Gradient effect
        style={styles.gradientText} 
      >
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
      </LinearGradient>

      {/* App Icon (No animation applied) */}
      <ImageBackground 
        source={appicon} 
        style={styles.image} 
        resizeMode="cover" 
      />

      {/* Bottom Navigation Icons with Fade-in Effect */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  gradientText: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10, 
    position: "absolute",
    top: 150,
  },
  appName: {
    fontSize: 40, // Larger for elegance
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 3, height: 3 },
    letterSpacing: 2,
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

