import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCBd-FA5zpAzNaQWZzxaYpNa0kAMPtnUjs",
  authDomain: "remote-cb26e.firebaseapp.com",
  databaseURL: "https://remote-cb26e-default-rtdb.firebaseio.com",
  projectId: "remote-cb26e",
  storageBucket: "remote-cb26e.firebasestorage.app",
  messagingSenderId: "53888718931",
  appId: "1:53888718931:web:9323142622b89c91518ea6"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
