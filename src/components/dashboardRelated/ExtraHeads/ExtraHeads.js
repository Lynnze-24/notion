import React from 'react'
import './ExtraHeads.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faEdit, faEllipsisVertical, faListDots, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import Menu from '../../Menu/Menu'
import exchangeArrItem from '../../../utils/exchangeArrItem'
import DragOverWrap from '../../DragOverWrap/DragOverWrap'
import { useDragContext } from '../../../store/context/DragProvider'




const ExtraHeadItem = ({item,index,setHeadList,setItemList,itemList}) => {
      
     const menuRef = useRef()
     const iconBtnRef = useRef();
     const colorRef = useRef()
      const titleRef = useRef()
    

     const [menuVisible, setMenuVisible] = useState(false)
     const [title, setTitle] = useState(item.title || '')

      const {setDragType,setDragItem,dragItem} = useDragContext()
   

    const menuToggle = (e)=> {
        setMenuVisible(x => !x);
    }
    const menuHide = (e)=> {
        if(!(iconBtnRef?.current?.contains(e.target) || menuRef?.current?.contains(e.target))){
            setMenuVisible(false)
        }
        
    }

    useEffect(() => {
        window.addEventListener('click',menuHide)
        return () => {
            window.removeEventListener('click',menuHide)
        }
    }, [])

    useEffect(() => {
        if(item.editMode)titleRef.current.focus()
    }, [item.editMode])

     const deleteList = ()=>{
        console.log('delete list')
        setItemList((x)=> {
            let y = [...x]
            y = y.filter( z=> z!== y[index])
            return y
        })
        setHeadList((x)=> {
            let y = [...x]
            y = y.filter( z=> z!== y[index])
            return y
        })
    }

     const editListHeader = ()=>{
        setHeadList((x)=> {
            let y = [...x]
            y[index].editMode = true; 
            return y;
        })
    }

    const changeColor = () => {
        setMenuVisible(false)
        colorRef.current.click()
       
    }

    const saveColor = ()=> {
        setHeadList((x)=> {
            let y = [...x]
            y[index].color = colorRef.current.value; 
            return y;
        })
       
    }
        
    const menuList=[
        
        {
            label:'Rename',
            icon:faEdit,
            action:editListHeader
        },
        {
            label:'Color',
            icon:faCircle,
            action:changeColor
        },
        {
            label:'Delete',
            icon:faTrash,
            action:deleteList
        },
        
    ]

    const saveHeader = (save = true)=> {
        
        if(title==='' || (!save && item.title==='') ){
            return deleteList();
        }
        let changedTitle = save?title:item.title;
        setTitle(changedTitle)
        setHeadList((x)=> {
            let y = [...x]
            y[index].editMode = false;
            y[index].title = changedTitle
            return y;
        })
    }

    const keyUpHandler =(e)=>{
        e.preventDefault();
        if(e.code === 'Enter') saveHeader()
        if(e.code === 'Escape') saveHeader(false)
    }

    const drop =(e) => {
        e.preventDefault()
        let etype = e.dataTransfer.getData("etype");
        if(etype === 'head') {
             let dropIdx = e.currentTarget.getAttribute('data-index');
             let dragIdx = e.dataTransfer.getData("idx");
             setHeadList((prev)=> exchangeArrItem(dragIdx,dropIdx,prev))
              e.target.classList.remove('hidden')
        }else{
            let dropIdL = e.currentTarget.getAttribute('data-headid');
            let dragIdx = e.dataTransfer.getData("idx");
            let dragIdL = e.dataTransfer.getData("idL");
             let y = {...itemList};
            console.log(dragIdL,dragIdx,dropIdL,y)
            y[dropIdL].push(y[dragIdL][dragIdx])
            y[dragIdL].splice(dragIdx,1)
            console.log(y[dragIdL][dragIdx],'removed')
               
            setItemList(y)  
        }
        setDragType('')
    }

     const drag =(e) => {
        let data = e.target.getAttribute('data-index');
        e.dataTransfer.setData("idx", data);
        e.dataTransfer.setData("etype",'head');
        setDragType('head')
        e.target.classList.add('hidden')
        
    }

    const handleDragEnd = (e )=> {
        e.preventDefault()
        e.target.classList.remove('hidden')
    }
    


    return(<DragOverWrap etype='all' data-headid={item.id} data-index={index} drop={drop}>
            <div  data-index={index} draggable={true} onDragEnd={handleDragEnd} onDragStart={(e)=> drag(e)}  style={{'--bgColor':item.color}} 
            className={`extraList-item`}>
                             <input ref={titleRef} onKeyUp={keyUpHandler} onBlur={saveHeader}  value={title} onChange={(e)=> setTitle(e.target.value)} disabled={!item.editMode} />
                             <div ref={iconBtnRef}  onClick={menuToggle} className='menu' >
                                <FontAwesomeIcon className='extraHeads-item_menu' icon={faEllipsisVertical} />  
                                <input onChange={saveColor} ref={colorRef} type='color'  />
                                {menuVisible && <Menu isLeft={true} ref={menuRef} menuList={menuList} onClick={menuHide} />}
                            </div>
                            
                         </div>     
                        </DragOverWrap>)
}



export default function ExtraHeads({list=[],preset=3,setHeadList,setItemList,createNewGroup,itemList}) {

  return (list.length > 0) ? (
    <div  className='extraHeads'>
               <div className='extraHeads-head'>
                     <p>Hidden Groups </p>
                     <FontAwesomeIcon onClick={createNewGroup} className='extraHeads-head_btn' icon={faPlus} />
                </div>
                <div className='extraList'>
                    {list.map((l,i) => (<ExtraHeadItem itemList={itemList} setHeadList={setHeadList} setItemList={setItemList} index={i+preset} key={l.id} item={l} />))}
                </div>
    </div>  
  ): (<div  className='extraHeads'>
            <button className='extraHeads-newTaskGroup' onClick={createNewGroup}>
                Create Task Group
                <FontAwesomeIcon style={{marginLeft:'0.5rem'}}  icon={faPlus} />
                </button>
           
             </div>)
}
