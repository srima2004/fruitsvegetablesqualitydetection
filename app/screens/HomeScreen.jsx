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

    try {
      console.log("🚀 Sending request to backend...");
      const response = await fetch("http://192.168.1.4:5000/predict", {
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


      // Navigate to ResultScreen with the captured image and response data
      router.push({ pathname: "/screens/ResultScreen", params: { image: imageUri, result: JSON.stringify(data) } });

    } catch (error) {
      console.error("❌ Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image.");
      setIsUploading(false); // Stop loading in case of an error
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
              <TouchableOpacity onPress={() => setCameraOpen(true)} style={styles.cameraButton}>
                <Icon name="camera" size={40} color="white" />
              </TouchableOpacity>
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
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },
  backText: {
    fontSize: 18,
    color: "#f4a261",
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
    backgroundColor: "#f4a261",
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
