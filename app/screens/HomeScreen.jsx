import { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // New state for loading indicator
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef(null);
  const router = useRouter();

  if (!permission?.granted) requestPermission();
  if (!mediaPermission?.granted) requestMediaPermission();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Camera permission is required to use this feature.");
      }
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user) router.replace("/screens/Login");
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#ecd4bf" />;
  }

  const sendToBackend = async (imageUri) => {
    setIsUploading(true); // Start loading

    console.log("📤 Preparing image for upload:", imageUri);
    const fileName = imageUri.split("/").pop();
    const newPath = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.copyAsync({ from: imageUri, to: newPath });

    let fileType = fileName.split(".").pop();
    const formData = new FormData();
    formData.append("file", { uri: newPath, name: fileName, type: `image/${fileType}` });
    const BASE_URL = "https://fruitsvegetablesqualitydetection-3.onrender.com";

    try {
      console.log("🚀 Sending request to backend...");
      const response = await fetch(`${BASE_URL}/predict`, {
        method: "POST",
        body: formData,
        headers: {  Accept: "application/json" },
      });

      const data = await response.json();
      console.log("✅ Upload response:", data);
        setIsUploading(false);

          // Navigate to the results screen with image and prediction data
         router.push({
        pathname: "/ResultScreen",
        params: { image: imageUri, result: JSON.stringify(data) }
       });
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image.");
      setIsUploading(false); // Stop loading in case of an error
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        console.log("📤 Selected image:", result.assets[0].uri);
        sendToBackend(result.assets[0].uri); // Send selected image to backend
    }
};

  const takePhoto = async () => {
    if (!cameraRef.current) {
      Alert.alert("Error", "Camera is not ready.");
      return;
    }

    try {
      console.log("📸 Taking picture...");
      const photo = await cameraRef.current.takePictureAsync({ base64: false });
      console.log("✅ Picture taken:", photo.uri);

      setImage(photo.uri);
      await MediaLibrary.createAssetAsync(photo.uri);
      Alert.alert("Photo Saved", "Photo saved to gallery!");

      setCameraOpen(false); // Close the camera
      sendToBackend(photo.uri); // Send to backend

    } catch (error) {
      console.error("❌ Error taking picture:", error);
      Alert.alert("Error", "Failed to capture image.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { signOut(auth); router.replace("/screens/Login"); }} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {isUploading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f4a261" />
          <Text style={styles.loadingText}>Your image is scanning, please wait...</Text>
        </View>
      ) : (
        <>
          {cameraOpen ? (
            <CameraView ref={cameraRef} style={styles.camera} facing={"back"}>
              <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
                <Text style={styles.buttonText}>Capture</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCameraOpen(false)} style={styles.backButton}>
                <Text style={styles.backText}>← Back</Text>
              </TouchableOpacity>
            </CameraView>
          ) : (
            <>
              <Text style={styles.title}>Scan here</Text>
              <View style={styles.scanContainer}>
    <TouchableOpacity onPress={() => setCameraOpen(true)} style={styles.cameraButton}>
        <Icon name="camera" size={40} color="white" />
    </TouchableOpacity>
    <Text style={styles.scanText}>Scan here</Text> 

    {/* Upload Image Button */}
    <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <Icon name="upload" size={30} color="white" />
        <Text style={styles.uploadText}>Upload Image</Text>
    </TouchableOpacity>
</View>


            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  scanContainer: {
    alignItems: "center", // Centers icon and text
    marginTop: 20, // Add spacing from top elements
},
scanText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2a9d8f", // Matches button color
    marginTop: 10, // Space between icon and text
},
uploadButton: {
  bottom:-100,
  backgroundColor: "#3b82f6", // Blue button
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 8,
  flexDirection: "row",
  alignItems: "center",
  marginTop: 20, // Spacing from camera button
},
uploadText: {
  fontSize: 16,
  fontWeight: "bold",
  color: "white",
  marginLeft: 8, // Space between icon and text
},


  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },
  backText: {
    fontSize: 18,
    color: "rgba(14, 137, 112, 0.98)",
    fontWeight: "bold",
  },
  logoutButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: "#e63946",
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  cameraButton: {
    backgroundColor: "#2a9d8f",
    padding: 15,
    borderRadius: 50,
  },
  captureButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "rgba(14, 137, 133, 0.98)",
    padding: 15,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e1e1e",
  },
  loadingContainer: {
    position: "absolute",
    top: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
