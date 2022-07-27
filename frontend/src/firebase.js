import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "videoapp-2b2d6.firebaseapp.com",
  projectId: "videoapp-2b2d6",
  storageBucket: "videoapp-2b2d6.appspot.com",
  messagingSenderId: "636090828670",
  appId: "1:636090828670:web:bc94cdf56600422fb0952f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
