
import { getAuth } from "firebase/auth";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANDmOyW4GUvyPgCIL8KRhawGbESs8-Djc",
  authDomain: "task-manager-ea2f8.firebaseapp.com",
  projectId: "task-manager-ea2f8",
  storageBucket: "task-manager-ea2f8.firebasestorage.app",
  messagingSenderId: "62994582682",
  appId: "1:62994582682:web:ab4c560f69c9912f7c2323"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth