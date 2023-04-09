import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyANSoTClxM42dVcdLEQ-op0lsSjlDOPL78",
  authDomain: "todo-app-c32a1.firebaseapp.com",
  projectId: "todo-app-c32a1",
  storageBucket: "todo-app-c32a1.appspot.com",
  messagingSenderId: "767116139671",
  appId: "1:767116139671:web:c65008b0c02caad54c9dd2",
  measurementId: "G-7WD1MRQNGF",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const db = getFirestore(app);
export default auth;
