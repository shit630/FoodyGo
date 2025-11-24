// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "foodygo-food-delivery.firebaseapp.com",
  projectId: "foodygo-food-delivery",
  storageBucket: "foodygo-food-delivery.firebasestorage.app",
  messagingSenderId: "695628756562",
  appId: "1:695628756562:web:fe4e2b2d74ac98dbd3518b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
