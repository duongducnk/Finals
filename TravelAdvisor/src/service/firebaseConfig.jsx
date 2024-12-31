// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtKm-KZRvI_CBHiv9EYeMKVAZtrA_4Tc0",
  authDomain: "website-project-a7d65.firebaseapp.com",
  projectId: "website-project-a7d65",
  storageBucket: "website-project-a7d65.firebasestorage.app",
  messagingSenderId: "203756336273",
  appId: "1:203756336273:web:54c1f27b66ea744e09bb30"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);