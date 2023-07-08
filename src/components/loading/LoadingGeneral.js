import React from 'react'
import './LoadingGeneral.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function LoadingGeneral() {
  return (
    <div className='loadingGeneral'>Loading <FontAwesomeIcon spinPulse icon={faSpinner} style={{marginLeft:'1rem',marginTop:'0.5rem'}}  /></div>
  )
}
