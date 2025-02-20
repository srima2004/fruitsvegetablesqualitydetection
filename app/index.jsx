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
        router.push("/screens/HomeScreen");  // Allow only logged-in users
      } else {
        router.push("/screens/Login");  //  Redirect to login
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* App Icon (ImageBackground) */}
      <ImageBackground source={appicon} style={styles.image} resizeMode="contain" />

      {/* Animated "FreshSense" Text */}
      <Animated.Text style={[styles.appName, { transform: [{ scale: textScaleAnim }], opacity: textOpacityAnim }]}>
        FreshSense
      </Animated.Text>

      {/* Bottom Navigation Icons */}
      <Animated.View style={[styles.bottomNav, { opacity: bottomNavOpacityAnim }]}>
        <Pressable onPress={handleHomePress}>
          <Icon name="home" size={35} color="#ecd4bf" />
        </Pressable>

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
  appName: {
    fontSize:35,
    fontWeight: "bold",
    backgroundColor:"#ecd4bf",
    color: "black",
    borderRadius:5,
    textAlign: "center",
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
    letterSpacing: 1,
    padding:5,
    position: "absolute",
    top: 200,
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
