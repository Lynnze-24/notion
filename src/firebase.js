import { initializeApp } from "firebase/app";

import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyBjER6T8uWwb0Bq1QQ57-AELhx1s2NWvtc",
    authDomain: "notion22-dec3.firebaseapp.com",
    projectId: "notion22-dec3",
    storageBucket: "notion22-dec3.appspot.com",
    messagingSenderId: "582137959153",
    appId: "1:582137959153:web:402ccb31e9168b09c34f50"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  // auth

  const auth = getAuth();


  export function signInWithGoogle(cb=()=>{}){
    getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
  
      // The signed-in user info.
      const user = result.user;
      console.log(user,'logged in')
      if(user)cb()
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(email,credential,'error')
     
    });
  }
