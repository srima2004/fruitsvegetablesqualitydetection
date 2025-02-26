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
      router.replace("/screens/HomeScreen"); //  Redirect to Home on success
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
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/")}>
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

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "white", 
    padding: 20 
  },

  backButton: { 
    position: "absolute", 
    top: 50, 
    left: 20, 
    backgroundColor: "rgba(14, 137, 14, 0.98)",  
    padding: 12, 
    borderRadius: 50, // Make it circular  
  },

  title: { 
    fontSize: 30, 
    fontWeight: "bold", 
    marginBottom: 30, 
    color: "rgba(14, 137, 14, 0.98)" ,
  },

  inputContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    borderWidth: 1, 
    borderColor: "rgba(14, 137, 14, 0.98)", 
    borderRadius: 12, 
    backgroundColor: "white", 
    marginBottom: 15, 
    width: "100%", 
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    shadowColor: "#FFD700", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4,
    elevation: 3,
  },

  input: { 
    flex: 1, 
    height: 50,
    fontSize: 16,
  },

  icon: { 
    marginRight: 12 ,
    color: "rgba(14, 137, 14, 0.98)", 
  },

  errorText: { 
    color: "red", 
    marginBottom: 15, 
    fontSize: 14 
  },

  button: { 
    backgroundColor: "rgba(14, 137, 14, 0.98)", 
    padding: 15, 
    borderRadius: 12, 
    alignItems: "center", 
    width: "100%", 
    marginBottom: 15 
  },

  buttonText: { 
    color: "#1a1a1a", 
    fontSize: 18, 
    fontWeight: "bold" 
  },

  signupText: { 
    marginTop: 15, 
    fontSize: 14, 
    color: "#bbb" 
  },

  signupLink: { 
    fontSize: 16, 
    color: "rgba(14, 137, 14, 0.98)", 
    fontWeight: "bold", 
    marginTop: 5 
  },
});  