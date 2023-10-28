// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
