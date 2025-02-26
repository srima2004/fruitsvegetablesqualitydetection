import { View, Animated, Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import { useEffect, useRef } from "react";
import { Link, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; 
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import appicon from "@/assets/images/app-icon.png";

export default function Index() {
  const router = useRouter();
  const textScaleAnim = useRef(new Animated.Value(0.5)).current; 
  const textOpacityAnim = useRef(new Animated.Value(0)).current; 
  const bottomNavOpacityAnim = useRef(new Animated.Value(0)).current; 
  const buttonScaleAnim = useRef(new Animated.Value(1)).current; 

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

  const handleHomePress = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/screens/HomeScreen");  
      } else {
        router.push("/screens/Login");  
      }
    });
  };

  return (
    <ImageBackground source={appicon} style={styles.imageBackground} resizeMode="cover">
      <View style={styles.overlay}>
        {/* Animated "FreshSense" Text */}
        <Animated.Text style={[styles.appName, { transform: [{ scale: textScaleAnim }], opacity: textOpacityAnim }]}>
          FreshSense
        </Animated.Text>

        {/* Motivational Quotes */}
        <Animated.View style={[styles.quotesContainer, { opacity: textOpacityAnim }]}>
          {/*<Text style={styles.quote}>Freshness at Your Fingertips</Text>*/}
          <Text style={styles.quotes}>Smart Care, Smarter Life</Text>
        </Animated.View>

        {/* Get Started Button */}
        <Animated.View style={[styles.buttonContainer, { opacity: textOpacityAnim }]}>
          <Pressable
            onPress={handleHomePress}
            style={({ pressed }) => [
              styles.getStartedButton,
              { transform: [{ scale: pressed ? 0.95 : 1 }] },
            ]}
          >
            <Text style={styles.buttonText}>Get Started </Text>
          </Pressable>
        </Animated.View>

      </View>
    </ImageBackground>
  );
}  

const styles = StyleSheet.create({
  imageBackground: {
    ...StyleSheet.absoluteFillObject, 
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: 42,
    fontWeight: "bold",
    fontFamily: "serif",
    color: "green",
    textAlign: "center",
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 8,
    letterSpacing: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    position: "absolute",
    top: "48%", 
  },
  quotesContainer: {
    position: "absolute",
    top: "48%",
    alignItems: "center",
    width: "80%",
  },
  quotes: {
    top:80,
    fontSize: 22,
    fontWeight: "600",
    fontFamily: "sans-serif",
    color: "green",
    marginVertical: 5,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    opacity: 0.9,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "5%",
  },
  getStartedButton: {
    backgroundColor: "rgb(246, 196, 15)",
    paddingVertical: 18,  // Increased height
    paddingHorizontal: 40,  // Increased width
    borderRadius: 30,  // Slightly rounded for a smooth look
    elevation: 12,
    shadowColor: "#ff9900",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  
  buttonText: {
    fontSize: 22,  // Bigger text for better visibility
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },  
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingVertical: 12,
    paddingHorizontal: 30,
    position: "absolute",
    bottom: 30,
    width: "80%",
    borderRadius: 20,
    elevation: 10,
  },
});

