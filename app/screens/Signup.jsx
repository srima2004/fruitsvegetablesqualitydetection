import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useRouter } from "expo-router";  // ✅ Import useRouter for navigation

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();  // ✅ Use router for back navigation

  // Signup Function
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Account Created Successfully!");
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Sign Up</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Link to Login Page */}
      <Text style={styles.loginText}>Already have an account?</Text>
      <Link href="/screens/Login" asChild>
        <TouchableOpacity>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

// Styles (same as Login.jsx)
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
    top: 50,  // Adjust based on your UI
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
  loginText: {
    marginTop: 15,
    fontSize: 14,
    color: "#fff",
  },
  loginLink: {
    fontSize: 18,
    color: "#ecd4bf",
    fontWeight: "bold",
    marginTop: 5,
  },
});
