// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAraSKRtVbPIMLsdqaQFcDQ3bPdZZm2_o",
  authDomain: "react-calorie-tracker.firebaseapp.com",
  projectId: "react-calorie-tracker",
  storageBucket: "react-calorie-tracker.appspot.com",
  messagingSenderId: "543026912242",
  appId: "1:543026912242:web:83af661a60d6a38658296b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
