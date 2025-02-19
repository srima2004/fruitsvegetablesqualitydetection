import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useRouter } from "expo-router";  

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();  // ✅ Use router for navigation

  // Login Function
  const handleLogin = async () => {
    try {
      console.log("Attempting login...");  // ✅ Debugging log
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Successful!", userCredential.user);  // ✅ Debugging log
  
      Alert.alert("Login Successful!", `Welcome ${userCredential.user.email}`);
      router.replace("/screens/HomeScreen");  // ✅ Redirects after login
    } catch (error) {
      console.error("Login Error:", error.message);  // ✅ Debugging log
      Alert.alert("Login Error", error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("/")} style={styles.backButton}>
        <Text style={styles.backText}>← Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Login</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address"/>
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>Don't have an account?</Text>
      <Link href="/screens/Signup" asChild>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },
  backText: {
    fontSize: 18,
    color: "#ecd4bf",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ecd4bf",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#ecd4bf",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 10,
    fontSize: 14,
    color: "#fff",
  },
  signupLink: {
    fontSize: 16,
    color: "#ecd4bf",
    fontWeight: "bold",
    marginTop: 5,
  },
});
