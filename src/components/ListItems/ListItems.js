import {  faTimes,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef } from 'react'
import exchangeArrItem from '../../utils/exchangeArrItem'
import './ListItems.css'
import { useState } from 'react'
import { useDragContext } from '../../store/context/DragProvider'
import DragOverWrap from '../DragOverWrap/DragOverWrap'

const SingleItem=({item,setItemList,listId,index,drag,drop})=>{

    const ref = useRef()
    const [title, setTitle] = useState(item.title || '')


    useEffect(()=>{
       if(item.editMode) ref.current.focus();
        
    },[item.editMode])

    const deleteItem=()=>{
        setItemList((x)=> {
            let y = {...x}
            y[listId] = [...y[listId]].filter(
                (z) => z.id !== item.id)
            return y;
        })
    }

    const saveItem = (save = true)=> {

        if(title.trim()==='' || !save && item.title==='' ) return deleteItem()

        let changedTitle = save? title : item.title;
        setTitle(changedTitle.trim())

        setItemList((x)=> {
            let y = {...x}
            y[listId] = [...y[listId]].filter(
                (z) => {
                    if(z.id === item.id){
                            z.editMode = false;
                            z.title = changedTitle.trim();
                    }
                    return z;
                }
            )
            return y;
        })
    }

    const editItem = ()=>{
        console.log('edit item')
        setItemList((x)=> {
            let y = {...x}
            y[listId] = [...y[listId]].filter(
                (z) => {
                    if(z.id === item.id){
                        z.editMode = true;
                    }
                    return z;
                }
            )
            return y;
        })
    }

      const handleDragEnd = (e )=> {
        e.preventDefault()
        e.target.classList.remove('hidden')
    }


    return(

        <DragOverWrap  etype='item' className='singleItemCon'  data-index={index} 
        data-headid={listId} drop={drop}>
        
        <div data-index={index} 
        data-headid={listId} 
        draggable  
        onDragStart={(e)=> drag(e)} 
        onDragEnd={handleDragEnd}
        onDoubleClick={editItem} 
        className='singleItem'>
           {item.editMode?(<input onKeyUp={(e) => {
               console.log(e.code)
               e.preventDefault()
               if(e.code === 'Enter') saveItem()
               if(e.code === 'Escape') saveItem(false)
           }} onBlur={saveItem} onChange={(e)=> setTitle(e.target.value)} value={title} ref={ref} type="text" />):
            (<p>{title}</p>)}
        </div>
        <div onClick={deleteItem} className='deleteBtn'>
         <FontAwesomeIcon icon={faTimes} />
        </div>
      
        </DragOverWrap>
    )
}

const ListItem = ({list,setItemList,listId}) => {

    const {setDragType} = useDragContext()

    const drag = (e)=>{
        let data = e.target.getAttribute('data-index');
        let dataL = e.target.getAttribute('data-headid');
        e.dataTransfer.setData("idx", data);
        e.dataTransfer.setData("idL", dataL);
        e.dataTransfer.setData("etype", 'item');
        setDragType('item')
        e.target.classList.add('hidden')
    }

    const dropHelper = (a,e) => {
        
        let dropIdx = e.currentTarget.getAttribute('data-index');
        let dropIdL = e.currentTarget.getAttribute('data-headid');
        let dragIdx = e.dataTransfer.getData("idx");
        let dragIdL = e.dataTransfer.getData("idL");
        let y = {...a};
        console.log(dropIdx,dropIdL,dragIdx,dragIdL,y)
        
        if((((dropIdx === 'container' && y[dropIdL]).length ===1)||
            (dragIdx === dropIdx)) 
            && (dragIdL === dropIdL)){
                console.log('no operation')
            return y;
        }else if(dragIdL === dropIdL && dropIdx !== 'container'){
            y[dropIdL] = exchangeArrItem(dragIdx,dropIdx,y[dropIdL],)
            console.log('same column',y[dropIdL])
        }else if(dropIdx === 'container' && dragIdx){
            y[dropIdL].push(y[dragIdL][dragIdx])
            y[dragIdL].splice(dragIdx,1)
            console.log('drop to different column container', y[dropIdL])
        }else if(!isNaN(Number(dropIdx))){
            y[dropIdL].splice(dropIdx, 0, y[dragIdL][dragIdx]);
            y[dragIdL].splice(dragIdx,1);
            console.log('diff column')
        }
       
        return y;
    }

    const drop = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        
        let etype = e.dataTransfer.getData("etype");
        if(etype !== 'item') return;
        let newArr = dropHelper(list,e)
        console.log(newArr,'dropped')
        setItemList(newArr);
        setDragType('')
        e.target.classList.remove('hidden')
    }

   

    const renderList = list[listId];

    return(
         <DragOverWrap drop={drop}  etype='item' className='singleListCon'   data-headid={listId}
             data-index={'container'}   >
            {
            renderList.map((item,index)=> (item && <SingleItem 
                                        drag={drag}
                                        drop={drop}
                                        key={item.id} 
                                        index={index} 
                                        listId={listId} 
                                        setItemList={setItemList}  
                                        item={item} />))
            }
        </DragOverWrap>
    )
}

const ListItems = ({list,setItemList,headList}) => {
    return (
        <div className='itemListCon' >
            {headList.map((item,index)=>(<ListItem setItemList={setItemList} key={item.id} list={list} listId={item.id} />))}
        </div>
    )
}

export default ListItems
