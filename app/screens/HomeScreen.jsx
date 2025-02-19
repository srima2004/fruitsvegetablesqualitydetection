import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";  
import { useRouter } from "expo-router";  // ✅ Import useRouter for navigation

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const router = useRouter();  // ✅ Use router for back navigation

  // Request Camera Permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Function to Open Camera and Take Picture
  const takePicture = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
      sendToBackend(result.uri);
    }
  };

  // Function to Send Image to Backend
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
      {/* 🔙 Back Button - Goes to Previous Screen */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Home Screen</Text>

      {/* Camera Icon to Open Camera */}
      <TouchableOpacity onPress={takePicture} style={styles.cameraButton}>
        <Icon name="camera" size={40} color="white" />
      </TouchableOpacity>

      {/* Show Captured Image */}
      {image && <Image source={{ uri: image }} style={styles.preview} />}
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
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
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
