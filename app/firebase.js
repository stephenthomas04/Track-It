// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk0WzBazFzwoZmMA7jPo0ANJsTKSfNXT0",
  authDomain: "track-it-31a75.firebaseapp.com",
  projectId: "track-it-31a75",
  storageBucket: "track-it-31a75.appspot.com",
  messagingSenderId: "82014681783",
  appId: "1:82014681783:web:8bed13270d50a8ab846b32",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default db;
