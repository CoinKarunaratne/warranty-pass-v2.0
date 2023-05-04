// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBFt2ur-jZ1DQXWKnvlloWcDGmZsZ-LRI",
  authDomain: "warranty-pass-v2.firebaseapp.com",
  projectId: "warranty-pass-v2",
  storageBucket: "warranty-pass-v2.appspot.com",
  messagingSenderId: "822789642961",
  appId: "1:822789642961:web:11a321cbc2e7668e0503f0",
  measurementId: "G-9HKK78H9FC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
