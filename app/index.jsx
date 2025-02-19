import { View, Animated, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; 
import appicon from "@/assets/images/app-icon.png";

export default function Index() {
  const textScaleAnim = useRef(new Animated.Value(0.5)).current; // Text starts small
  const textOpacityAnim = useRef(new Animated.Value(0)).current; // Text starts invisible
  const iconScaleAnim = useRef(new Animated.Value(0.5)).current; // App icon starts small
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
      // Step 2: App Icon Zooms in
      Animated.timing(iconScaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Step 3: Bottom Navigation Icons Fade In
      Animated.timing(bottomNavOpacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated "FreshSense" Text */}
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

      {/* App Icon with Zoom Animation */}
      <Animated.Image 
        source={appicon} 
        style={[styles.image, { transform: [{ scale: iconScaleAnim }] }]} 
        resizeMode="cover" 
      />

      {/* Bottom Navigation Icons with Fade-in Effect */}
      <Animated.View style={[styles.bottomNav, { opacity: bottomNavOpacityAnim }]}>
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
    backgroundColor: "#000",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#D2691E",
    textAlign: "center",
    letterSpacing: 2,
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 20,
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

