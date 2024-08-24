import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBF89tAsdNEokUavV42ngHrfXcdEHrrLBY",
  authDomain: "giphy-5801c.firebaseapp.com",
  projectId: "giphy-5801c",
  storageBucket: "giphy-5801c.appspot.com",
  messagingSenderId: "622395162639",
  appId: "1:622395162639:web:6bde0d042a52cfe76aa37a"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);