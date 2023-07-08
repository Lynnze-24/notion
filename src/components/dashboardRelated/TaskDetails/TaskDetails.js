import React from 'react'
import './TaskDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

export default function TaskDetails({taskId,open,setDetailState}) {
  return (
    <div className={`TaskDetailsCon ${open?'':"hiddenRight"}`}>
      <button onClick={()=>{
        setDetailState({open:false,id:''})
      }}><FontAwesomeIcon icon={faChevronCircleRight} /></button>
    </div>
  )
}
