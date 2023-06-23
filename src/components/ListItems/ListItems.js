import {  faTimes,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef } from 'react'
import exchangeArrItem from '../../utils/exchangeArrItem'
import './ListItems.css'

const SingleItem=({item,setItemList,listIndex,index,drag,drop})=>{

    const ref = useRef()
    useEffect(()=>{
       if(item.editMode) {
           if(item.title) ref.current.value = item.title;
           ref.current.focus();
        }
    },[item.editMode,item.title])

    const saveItem = (save = true)=> {
        setItemList((x)=> {
            let y = [...x]
            y[listIndex] = [...y[listIndex]].filter(
                (z) => {
                    if(z.id === item.id){
                        if(save && ref.current.value.trim()){
                            z.editMode = false;
                             z.title = ref.current.value.trim();
                        }else if(!save){
                            if(!z.title)return null;
                            z.editMode = false; 
                        }else{
                            return null;
                        }
                    }
                    return z;
                }
            )
            return y;
        })
    }

    const editItem = ()=>{
        setItemList((x)=> {
            let y = [...x]
            y[listIndex] = [...y[listIndex]].filter(
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

    const deleteItem=()=>{
        setItemList((x)=> {
            let y = [...x]
            y[listIndex] = [...y[listIndex]].filter(
                (z) => z.id !== item.id)
            return y;
        })
    }


    return(
        <div 
        className='singleItemCon'
        data-index={index} 
        data-indexl={listIndex} 
        onDrop={(e)=> {
            e.stopPropagation(); 
            console.log('item')
            drop(e)
        }}
          onDragOver={(e)=> e.preventDefault()}
            onDragEnter={(e)=> e.preventDefault()}>
        <div data-index={index} 
        data-indexl={listIndex} 
        draggable  
        onDragStart={(e)=> drag(e)} 
        onDoubleClick={editItem} 
        className='singleItem'>
           {item.editMode?(<input onKeyUp={(e) => {
               console.log(e.code)
               if(e.code === 'Enter') saveItem()
               if(e.code === 'Escape') saveItem(false)
           }} onBlur={saveItem} ref={ref} type="text" />):
            (<p>{item.title}</p>)}
        </div>
        <div onClick={deleteItem} className='deleteBtn'>
         <FontAwesomeIcon icon={faTimes} />
        </div>
      
        </div>
    )
}

const ListItem = ({list,setItemList,listIndex}) => {

    const drag = (e)=>{
        let data = e.target.getAttribute('data-index');
        let dataL = e.target.getAttribute('data-indexl');
        e.dataTransfer.setData("idx", data);
        e.dataTransfer.setData("idxL", dataL);
        e.dataTransfer.setData("etype", 'item');
    }

    const dropHelper = (a,e) => {
        
        let dropIdx = e.currentTarget.getAttribute('data-index');
        let dropIdxL = e.currentTarget.getAttribute('data-indexl');
        let dragIdx = e.dataTransfer.getData("idx");
        let dragIdxL = e.dataTransfer.getData("idxL");

        console.log(dropIdx,dropIdxL,dragIdx,dragIdxL)
        let y = [...a];
        if((((dropIdx === 'container' && y[dropIdxL]).length ===1)||
            (dragIdx === dropIdx)) 
            && (dragIdxL === dropIdxL)){
                console.log('no operation')
            return y;
        }else if(dragIdxL === dropIdxL && dropIdx !== 'container'){
            y[dragIdxL] = exchangeArrItem(dragIdx,dropIdx,y[dragIdxL]);
            console.log('same column')
        }else if(dropIdx === 'container' && dragIdx){
            y[dragIdxL][dragIdx] && y[dropIdxL].splice(y[dropIdxL].length,0,y[dragIdxL][dragIdx])
            y[dragIdxL].splice(dragIdx,1);
            console.log('drop to different column container')
        }else if(!isNaN(Number(dropIdx))){
            y[dragIdxL][dragIdx] && y[dropIdxL].splice(dropIdx,0,y[dragIdxL][dragIdx])
            y[dragIdxL].splice(dragIdx,1);
            console.log('diff column')
        }
        console.log(y)
        return y;
    }

    const drop = (e)=>{
        e.preventDefault();
        let etype = e.dataTransfer.getData("etype");
        if(etype !== 'item') return;
        let newArr = dropHelper(list,e)
        setItemList(newArr);
    }

    return(
        <div 
             data-indexl={listIndex}
             data-index={'container'}
             onDrop={(e)=> {
                 console.log('con')
                 drop(e)
                }} 
             //drop(e)
             onDragOver={(e)=> e.preventDefault()}
             onDragEnter={(e)=> e.preventDefault()} 
             className='singleListCon' >
            {
            list[listIndex].map((item,index)=> (item && <SingleItem 
                                        drag={drag}
                                        drop={drop}
                                        key={index} 
                                        index={index} 
                                        listIndex={listIndex} 
                                        setItemList={setItemList}  
                                        item={item} />))
            }
        </div>
    )
}

const ListItems = ({list,setItemList}) => {
    return (
        <div className='itemListCon' >
            {list.map((item,index)=>(<ListItem setItemList={setItemList} key={index} list={list} listIndex={index} />))}
        </div>
    )
}

export default ListItems
