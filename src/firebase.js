// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6YO6WfAF7OUS3mzKtrcGaZkOdcZkn67U",
  authDomain: "akwconsulting-assessment.firebaseapp.com",
  projectId: "akwconsulting-assessment",
  storageBucket: "akwconsulting-assessment.appspot.com",
  messagingSenderId: "319076516456",
  appId: "1:319076516456:web:bc7690bf1f9463144731dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
