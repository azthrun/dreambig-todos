import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdxucwStBRWEuHmIqYzo-VNW-9HToMXFE",
  authDomain: "dreambig-todos.firebaseapp.com",
  projectId: "dreambig-todos",
  storageBucket: "dreambig-todos.appspot.com",
  messagingSenderId: "1030128849554",
  appId: "1:1030128849554:web:712b7819db82f99000cc4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const signInToAppWithGoogle = async () : Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
}

const signOutFromApp = async () : Promise<void> => {
  await signOut(auth);
}

export { db, auth, signInToAppWithGoogle, signOutFromApp };
