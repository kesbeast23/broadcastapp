// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from "firebase/firestore"
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6UungeKL49NtiyKhCbTdzEUcu5WbeVO8",
  authDomain: "broadcastapp-15206.firebaseapp.com",
  projectId: "broadcastapp-15206",
  storageBucket: "broadcastapp-15206.appspot.com",
  messagingSenderId: "1063328761994",
  appId: "1:1063328761994:web:bee1a4ed34e7a6e18c0573"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const provider = new GoogleAuthProvider();
export {db,auth, storage,provider};