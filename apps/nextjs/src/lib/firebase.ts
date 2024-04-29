// Import the functions you need from the SDKs you need
import "firebase/compat/auth";

import type { FirebaseOptions } from "firebase/app";
import firebase from "firebase/compat/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyA_2nlhJVKGNflZIkybX8hPEDAz_8qugpc",
  authDomain: "pawrty-dev.firebaseapp.com",
  projectId: "pawrty-dev",
  storageBucket: "pawrty-dev.appspot.com",
  messagingSenderId: "5973868113",
  appId: "1:5973868113:web:8acf630fc58e978e8c0270",
  measurementId: "G-DFL5HK8LK6"
};

// Initialize Firebase

let app: firebase.app.App;
let auth: firebase.auth.Auth;

if (typeof window !== "undefined") {
  app = firebase.initializeApp(firebaseConfig);
  auth = firebase.auth(app);
}

export { app, auth, firebase };
