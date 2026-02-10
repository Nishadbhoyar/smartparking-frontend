// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2ck9ZBPdM51q30xgW_V4HAFq04JZLQGM",
  authDomain: "smartparking-d2ff0.firebaseapp.com",
  projectId: "smartparking-d2ff0",
  storageBucket: "smartparking-d2ff0.firebasestorage.app",
  messagingSenderId: "340070400185",
  appId: "1:340070400185:web:dda02d6448cce807879b68",
  measurementId: "G-MZF6S6S6CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);