import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDADHXTEVEpX0F3WSbez-nHCeHiSlTqxLA",
  authDomain: "xtraverse-a6c49.firebaseapp.com",
  databaseURL: "https://xtraverse-a6c49-default-rtdb.firebaseio.com",
  projectId: "xtraverse-a6c49",
  storageBucket: "xtraverse-a6c49.appspot.com",
  messagingSenderId: "828018151603",
  appId: "1:828018151603:web:4001756609ccf8afc2a0c6",
  measurementId: "G-6RY05VLEPY",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;
