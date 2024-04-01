// firebase.js

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCM_LYsNjkw6qqOyIslIuDI0Pswgq1khwY",
    authDomain: "vueverse-96952.web.app",
    projectId: "vueverse-96952",
    storageBucket: "gs://vueverse-96952.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID" // optional
  };
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Export the initialized Firebase app
export default firebaseApp;
