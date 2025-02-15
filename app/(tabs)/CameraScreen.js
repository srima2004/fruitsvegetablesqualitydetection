import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useRef } from 'react';

const CameraScreen = () => {
  const [cameraReady, setCameraReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  // Request camera permission on mount
  useState(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && cameraReady) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Photo taken:", photo.uri);
    }
  };

  if (hasPermission === null) {
    return <View><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        ref={(ref) => (cameraRef.current = ref)} 
        onCameraReady={() => setCameraReady(true)}
      />
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.buttonText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});
