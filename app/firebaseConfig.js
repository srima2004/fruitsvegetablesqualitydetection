import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJOVze8GC0_2nuwk8ZzQiPF2ExVls-THg",
  authDomain: "fv-detection.firebaseapp.com",
  projectId: "fv-detection",
  storageBucket: "fv-detection.firebasestorage.app",
  messagingSenderId: "897553647575",
  appId: "1:897553647575:android:bfc762091cbeb18e28ad92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  // ✅ Export Firebase Auth
export default app;
