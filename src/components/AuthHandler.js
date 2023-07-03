import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { setDoc,doc,getDoc, onSnapshot} from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import {db } from "../firebase";
import {  useDispatch, useSelector } from 'react-redux'
import { emptyUser, setUser } from '../store/reducers/user/user';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function AuthHandler() {
  
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
   const dispatch = useDispatch()
    const auth = getAuth();
    const location = useLocation();
   useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth,async user => {
      if (user) {
        // User is signed in.
        const userData = {
          id:user?.uid,
          name:user?.displayName,
          email:user?.email,
          photoUrl:user?.photoURL
        }
        localStorage.setItem('userValidTime',user?.stsTokenManager?.expirationTime)
        
        let docRef = doc(db,"users",user?.uid)
         const docu = await getDoc(docRef);
          if (docu.exists()) {
            console.log("Document exists");
          } else {
            console.log("Document does not exist");
            await setDoc(docRef,{
              ...userData,
            })
          }
           dispatch(setUser(userData))
           console.log('sign in',location)
           navigate('/dashboard')
            if(isLoading) setIsLoading(false)
      } else {
        // User is signed out.
         dispatch(emptyUser())
        localStorage.removeItem('userValidTime')
        console.log('sign out',location)
          navigate('/home')
          if(isLoading) setIsLoading(false)
      }
    },(e)=> console.log(e))
    
   
   
    return ()=>unsubscribe();
  }, []);  
  

  

  return  isLoading?(<div style={{position:'fixed',
  top:0,
  left:0,
  width:'100%',
  height:'100%',
  background:'black',
  color:'white',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  zIndex:2000,
  fontSize:'3em'

}} >Loading <FontAwesomeIcon spinPulse icon={faSpinner} style={{marginLeft:'1rem',marginTop:'0.5rem'}}  /></div>):(<></>) ; // or you can return a loading indicator or any other appropriate component
}