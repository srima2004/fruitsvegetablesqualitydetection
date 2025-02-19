import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";  

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  
  const router = useRouter();

  const handleLogin = async () => {
    setError(""); // Reset error before new login attempt
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/screens/HomeScreen"); // ✅ Redirect to Home on success
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No account found. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Try again.");
      } else {
        setError("Login failed. Please check your details.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Error Message UI */}
      {error !== "" && <Text style={styles.errorText}>{error}</Text>}

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Navigate to Signup */}
      <Text style={styles.signupText}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => router.push("/screens/Signup")}>
        <Text style={styles.signupLink}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black", padding: 20 },
  
  backButton: { 
    position: "absolute", 
    top: 50, 
    left: 20, 
    padding: 10,
  },

  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#ecd4bf" },

  inputContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ccc", borderRadius: 10, backgroundColor: "#fff", marginBottom: 10, width: "100%", paddingHorizontal: 10 },

  input: { flex: 1, height: 50 },

  icon: { marginRight: 10 },

  errorText: { color: "red", marginBottom: 10, fontSize: 14 },

  button: { backgroundColor: "#ecd4bf", padding: 12, borderRadius: 10, alignItems: "center", width: "100%", marginBottom: 10 },

  buttonText: { color: "black", fontSize: 18, fontWeight: "bold" },

  signupText: { marginTop: 10, fontSize: 14, color: "#555" },

  signupLink: { fontSize: 16, color: "#ecd4bf", fontWeight: "bold", marginTop: 5 },
});
