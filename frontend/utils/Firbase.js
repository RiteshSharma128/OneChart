import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginonecart-ddd1c.firebaseapp.com",
  projectId: "loginonecart-ddd1c",
  storageBucket: "loginonecart-ddd1c.firebasestorage.app",
  messagingSenderId: "517299172364",
  appId: "1:517299172364:web:1527819171636ad7daea29"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

const provider = new GoogleAuthProvider();
export {auth,provider}