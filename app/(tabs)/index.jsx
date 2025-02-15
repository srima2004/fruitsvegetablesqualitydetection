import { View, Text, StyleSheet, ImageBackground, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import appicon from "@/assets/images/app-icon.png";

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const openCamera = () => {
    if (hasPermission === null) {
      return; 
    }
    if (hasPermission === false) {
      Alert.alert("Camera permission is required to use this feature.");
      return;
    }

    // Navigate to a new screen where the camera will be implemented
    router.push('/CameraScreen');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={appicon} resizeMode="cover" style={styles.image}>
        <Pressable style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Scan</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 6,
    marginTop: 400,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  },
});
