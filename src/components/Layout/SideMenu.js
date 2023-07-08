import React, { useState } from 'react'
import './Layout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHamburger, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

import { auth } from '../../firebase'
import { useNavigate,useLocation, Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'


export default function SideMenu() {

    const [navOpen, setNavOpen] = useState(false)
    const user = useSelector(state => state.user)
  
    const location = useLocation();

   

    const signOutHandler =()=>{
        signOut(auth)
    }
    

  return (
    <aside className={`sideMenu ${navOpen?'navOpen':''}`}>
        <div onClick={()=> setNavOpen(prev => !prev)} className='sideHamBurger'>
         <FontAwesomeIcon fontSize={24} icon={navOpen? faTimes :faBars}/>
        </div>
        <div className='sideContainer'>
            <div className='sideUser'>
                <div className='sideUserImg'>
                 <img src={user?user.photoUrl.replace(/s\d+-c/, 's150-c'):''}  alt='profile-pic'/>
                </div>
                 <p>{user.email}</p>
            </div>
            <ul className='sideLinks'>
                <Link to=''>
                <li className={location?.pathname ==='/dashboard'?'active':''} >Dashboard</li>
                </Link>
                <Link to='controls'>
                <li className={location?.pathname ==='/dashboard/controls'?'active':''} >Controls</li>
                </Link>
                <li  onClick={signOutHandler}>Log out</li>
            </ul>
            <div className='sideLogo'>
                <img src='logo.png' />
            </div>
            
        </div>
      </aside>
  )
}
