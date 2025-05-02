// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Missing import added

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "aireel-68880.firebaseapp.com",
  projectId: "aireel-68880",
  storageBucket: "aireel-68880.firebasestorage.app",
  messagingSenderId: "241695808331",
  appId: "1:241695808331:web:9227931bd757150d59e6ce",
  measurementId: "G-E74NQ38K3P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ✅ Correct usage
