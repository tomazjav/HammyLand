// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // LOGIN WITH GOOGLE
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAYIfajgZ2t3dXAxJ5ytO3vZpWIC-IKUNc',
  authDomain: 'first-project-51bd9.firebaseapp.com',
  projectId: 'first-project-51bd9',
  storageBucket: 'first-project-51bd9.appspot.com',
  messagingSenderId: '278313103422',
  appId: '1:278313103422:web:7e357904dd6b904c7d216f',
  measurementId: 'G-N47BHBS44X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app); //export auth
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
