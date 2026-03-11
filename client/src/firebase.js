// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "webcraft-ai-f1e67.firebaseapp.com",
  projectId: "webcraft-ai-f1e67",
  storageBucket: "webcraft-ai-f1e67.firebasestorage.app",
  messagingSenderId: "71393189665",
  appId: "1:71393189665:web:10f0c2927c1a6aca2da860"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}