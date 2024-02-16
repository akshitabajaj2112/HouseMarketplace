
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByYbWMk1CpVXSODmLvSmqGl6vzy5RaGrg",
  authDomain: "house-marketplace-app-f1f27.firebaseapp.com",
  projectId: "house-marketplace-app-f1f27",
  storageBucket: "house-marketplace-app-f1f27.appspot.com",
  messagingSenderId: "730925445667",
  appId: "1:730925445667:web:870d536507e1b002507796"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();