// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyC4okDlF3mKJBTXCelPSHxFf6JmrnDimLw",
  authDomain: "portfolio-f6166.firebaseapp.com",
  projectId: "portfolio-f6166",
  storageBucket: "portfolio-f6166.appspot.com",
  messagingSenderId: "807804904472",
  appId: "1:807804904472:web:504249ec673332dcc44f6d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
