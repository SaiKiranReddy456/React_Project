import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDVfb1kFWtEw_nboZtumgIYcL8-qaTqhzE",
  authDomain: "healthbridge-2ec1f.firebaseapp.com",
  projectId: "healthbridge-2ec1f",
  storageBucket: "healthbridge-2ec1f.firebasestorage.app",
  messagingSenderId: "60553369125",
  appId: "1:60553369125:web:4b930423f5b29cee74d1cc",
  measurementId: "G-34LK5055MS"
};

const app = initializeApp(firebaseConfig);
export const authentication=getAuth(app)
export const db=getFirestore(app)
