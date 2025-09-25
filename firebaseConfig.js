// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7aSuSI-mah75UNGc-MVs6sJ9MxS4_wM8",
  authDomain: "narrato-58adc.firebaseapp.com",
  projectId: "narrato-58adc",
  storageBucket: "narrato-58adc.firebasestorage.app",
  messagingSenderId: "333762169137",
  appId: "1:333762169137:web:a55f0f27a1f059e62ec810"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);