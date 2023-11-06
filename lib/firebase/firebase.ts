import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

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

// export const provider = new GoogleAuthProvider();

// export const logOutFromGoogle = (auth: any) =>
//   signOut(auth)
//     .then(() => {
//       localStorage.removeItem("token");
//       console.log("log out");
//     })
//     .catch((error) => {
//       // An error happened.
//     });

// export const logInWithGoogle = (auth: any, provider: any) =>
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       if (credential) {
//         const token = credential.accessToken;
//         localStorage.setItem("token", token || "");
//       }

//       // The signed-in user info.
//       const user = result.user;
//       console.log(user);
//       console.log("log in");
//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
