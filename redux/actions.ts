import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { AppDispatch, StateType } from "./store";
import { auth, provider } from "@/lib/firebase/firebase";
import { setIsLogIn, setUser } from "./reducer";

export const logInUsingGoogleAccount =
  () => (dispatch: AppDispatch, getState: StateType) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          localStorage.setItem("token", token || "");
        }

        // The signed-in user info.
        const user = result.user;
        console.log(user);
        dispatch(setIsLogIn(true));
        dispatch(setUser(true));
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

export const logOutOfGoogleAccount =
  () => (dispatch: AppDispatch, getState: StateType) => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
        console.log("log out");
      })
      .catch((error) => {
        // An error happened.
      });
  };
