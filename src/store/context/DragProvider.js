import { createContext, useContext, useState } from 'react';

export const DragContext = createContext(null);



export default function DragProvider({children}) {

    const [dragType, setDragType] = useState('')
    const [dragItem, setDragItem] = useState(null)

    return (
        <DragContext.Provider value={{dragType,setDragType,dragItem, setDragItem}}>
        {children}
        </DragContext.Provider>
    )
}

export const useDragContext =()=> useContext(DragContext)