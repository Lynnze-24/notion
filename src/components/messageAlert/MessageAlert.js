import React from 'react'
import { createPortal } from 'react-dom';
import './MessageAlert.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,  faTimes } from '@fortawesome/free-solid-svg-icons';

const icons= {
    success:faCheck,
    error:faTimes
}

export default function MessageAlert({message,mode='success'}) {
  return createPortal(
    (<div className={`messageAlert ${mode}`}>
         <FontAwesomeIcon className='fontawesome' icon={icons[mode]} />
        {message}
        </div>),
    document.body
  )
}
