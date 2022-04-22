// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp9RrZIXaisUBkSDmsyxqa5kWnLiQLPkY",
  authDomain: "movies-app-70236.firebaseapp.com",
  projectId: "movies-app-70236",
  storageBucket: "movies-app-70236.appspot.com",
  messagingSenderId: "509154409046",
  appId: "1:509154409046:web:356c00ecdcc0d688ba19f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
