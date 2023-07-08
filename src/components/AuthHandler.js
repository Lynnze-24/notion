import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { setDoc,doc,getDoc, onSnapshot} from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import {db } from "../firebase";
import {  useDispatch, useSelector } from 'react-redux'
import { emptyUser, setUser } from '../store/reducers/user/user';

import uniqueId from "../utils/uniqueId";
import { dummyTask } from "../dummyTask";
import LoadingGeneral from "./loading/LoadingGeneral";

export default function AuthHandler() {
  
  const [loading, setLoading] = useState(true)
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

        let pageId1 = "page12345";
        let pageId2 = "page678910";
        
        let docRef = doc(db,"users",user?.uid)
        let pageRef1 = doc(db,"users",user?.uid,"pages",pageId1)
        let pageRef2 = doc(db,"users",user?.uid,"pages",pageId2)
        
         const docu = await getDoc(docRef);
          if (docu.exists()) {
            console.log("Document exists");
          } else {
            console.log("Document does not exist");
            await setDoc(docRef,{
              ...userData,
              pages:[
                {
                id:pageId1,
                name:'task'
              },
              {
                id:pageId2,
                name:'test'
              },
            ]
            })

            await setDoc(pageRef1,
                {
                  name:'tasks',
                  details:dummyTask,
                  updatedAt:Date.now()
                })

           await setDoc(pageRef2,
                {
                  name:'test',
                  details:[{
                    id:'head10',
                    title:'To do',
                    color:'red',
                    editMode:false,
                    tasks:[
                    { 
                      id:uniqueId('task'),
                      title:'take a bath',
                      editMode:false,
                    }, 
                  ],
                  },],
                  updatedAt:Date.now()
                }
               )
           
            
            

          }
           dispatch(setUser(userData))
           console.log('sign in',location)
           navigate('/dashboard')
            if(loading) setLoading(false)
      } else {
        // User is signed out.
         dispatch(emptyUser())
        localStorage.removeItem('userValidTime')
        console.log('sign out',location)
          navigate('/home')
          if(loading) setLoading(false)
      }
    },(e)=> console.log(e))
    
   
   
    return ()=>unsubscribe();
  }, []);  
  

  

  return  loading?(<LoadingGeneral />):(<></>) ; // or you can return a loading indicator or any other appropriate component
}