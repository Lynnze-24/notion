import React, { useState } from 'react'
import { useDragContext } from '../../store/context/DragProvider';

export default function DragOverWrap({children,className,drop,etype,...props}) {

     const [isDraggingOver, setIsDraggingOver] = useState(false);
     const {dragType} = useDragContext()

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        console.log(dragType === etype,dragType,etype,'etype dragover')
         if(etype === dragType || etype === 'all')setIsDraggingOver(true)
    };

    const handleDragLeave = () => {
        if(isDraggingOver)setIsDraggingOver(false);
    };

    const handleDragEnter = (e)=> {
        e.preventDefault()
       
    }



  return (
    <div  onDrop={(e)=> {
        drop(e)
         if(isDraggingOver)setIsDraggingOver(false)
    }} onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            className={isDraggingOver?`${className} dragOverCon`: className}
              {...props}
              >
                {children}
              </div>
  )
}
