import { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/FontAwesome";  
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        router.replace("/screens/Login");  // ✅ Redirect to Login if not logged in
      }
    });

    return unsubscribe; // Cleanup listener
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#ecd4bf" />;
  }

  // Function to Take Picture
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      setImage(photo.uri);
      sendToBackend(photo.uri);
      setCameraOpen(false);  // Close camera after taking a picture
    }
  };

  // Send Image to Backend
  const sendToBackend = async (imageUri) => {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    try {
      const response = await fetch("https://your-backend-api.com/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();
      alert("Scan Result: " + data.result);
    } catch (error) {
      alert("Error uploading image: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity onPress={() => {
        signOut(auth);
        router.replace("/screens/Login"); // Redirect to Login after logout
      }} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Show Live Camera Preview */}
      {cameraOpen ? (
        <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Icon name="camera" size={30} color="white" />
          </TouchableOpacity>
        </Camera>
      ) : (
        <>
          <Text style={styles.title}>Scan here</Text>

          {/* Open Camera Button */}
          <TouchableOpacity onPress={() => setCameraOpen(true)} style={styles.cameraButton}>
            <Icon name="camera" size={40} color="white" />
          </TouchableOpacity>

          {/* Show Captured Image */}
          {image && <Image source={{ uri: image }} style={styles.preview} />}
        </>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
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
  logoutButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  captureButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#432c1a",
    padding: 15,
    borderRadius: 50,
  },
  cameraButton: {
    backgroundColor: "#432c1a",
    padding: 15,
    borderRadius: 50,
  },
  preview: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
