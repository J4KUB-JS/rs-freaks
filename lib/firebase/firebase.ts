import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjumKqm7LmK0gnfaznVD1ituc-JTNk_bI",
  authDomain: "rs-freaks-58392.firebaseapp.com",
  projectId: "rs-freaks-58392",
  storageBucket: "rs-freaks-58392.appspot.com",
  messagingSenderId: "284203786678",
  appId: "1:284203786678:web:c7b578f0c48c22ca692117",
  measurementId: "G-8PM7KNP52Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const imageDb = getStorage(app);
export const auth = getAuth();
