import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,  GoogleAuthProvider,signInWithPopup,signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDqnMjGZjkJukpnZFxpNZ3bR0sLimTx6m0",
  authDomain: "organize-x.web.app",
  projectId: "organize-x",
  storageBucket: "organize-x.appspot.com",
  messagingSenderId: "64737473539",
  appId: "1:64737473539:web:2855d423c782d8178e8a36",
  measurementId: "G-DFMNHFX6F4"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAnalytics(app)

  // auth

  export const auth = getAuth();
  const provider = new GoogleAuthProvider();
 provider.addScope('profile');
provider.addScope('email');

  export function signInWithGoogle(){
    signInWithPopup(auth,provider)
  }


    
 


  export const db = getFirestore(app);