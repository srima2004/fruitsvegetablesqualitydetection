import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";  

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState(""); // New state for retyping password
  const [error, setError] = useState("");  
  const router = useRouter();

  const handleSignup = async () => {
    setError(""); // Reset error before a new signup attempt

    if (password !== retypePassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/screens/HomeScreen"); // Redirect to Home on success
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use. Try logging in.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Sign Up</Text>

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

      {/* Retype Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Retype Password"
          value={retypePassword}
          onChangeText={setRetypePassword}
          secureTextEntry
        />
      </View>

      {/* Error Message UI */}
      {error !== "" && <Text style={styles.errorText}>{error}</Text>}

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Navigate to Login */}
      <Text style={styles.loginText}>Already have an account?</Text>
      <TouchableOpacity onPress={() => router.push("/screens/Login")}>
        <Text style={styles.loginLink}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", 
    padding: 20,
  },

  
  backButton: { 
    position: "absolute",
    top: 50, 
    left: 20,
    backgroundColor: "rgba(14, 137, 14, 0.98)", 
    padding: 10,
    borderRadius: 20,
  },

  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "rgba(14, 137, 14, 0.98)", 
  },

  
  inputContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 10, 
    backgroundColor: "#f9f9f9", 
    marginBottom: 10, 
    width: "100%", 
    paddingHorizontal: 10 
  },

  input: { 
    flex: 1, 
    height: 50, 
    color: "#333", 
  },

  icon: { 
    marginRight: 10, 
    color: "rgba(14, 137, 14, 0.98)", 
  },

 
  errorText: { 
    color: "red", 
    marginBottom: 10, 
    fontSize: 14 
  },

 
  button: { 
    backgroundColor: "rgba(14, 137, 14, 0.98)", 
    padding: 12, 
    borderRadius: 10, 
    alignItems: "center", 
    width: "100%", 
    marginBottom: 10 
  },

  buttonText: { 
    color: "black", 
    fontSize: 18, 
    fontWeight: "bold" 
  },

  loginText: { 
    marginTop: 15, 
    fontSize: 14, 
    color: "#777" 
  },

  loginLink: { 
    fontSize: 18, 
    color: "rgba(14, 137, 14, 0.98)", 
    fontWeight: "bold", 
    marginTop: 5 
  },
});
