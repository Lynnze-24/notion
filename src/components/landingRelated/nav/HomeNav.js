import React from 'react'
import './HomeNav.css'

export default function HomeNav() {
  return (  
            <nav>
                <img src="logo.png" alt="logo"/>
                <div className="links">
                    <a href="#main">Home</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>
  )
}
