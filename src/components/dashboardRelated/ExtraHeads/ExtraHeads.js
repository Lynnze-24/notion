import React, { useCallback } from 'react'
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
import { SketchPicker } from 'react-color'




const ExtraHeadItem = ({item,index,setHeadList,setItemList,itemList,setSaving}) => {
      
     const menuRef = useRef()
     const iconBtnRef = useRef();
     const colorRef = useRef()
      const titleRef = useRef()
    

     const [menuVisible, setMenuVisible] = useState(false)
     const [title, setTitle] = useState(item.title || '')
     const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)
    const [currentColor, setCurrentColor] = useState(item.color)

      const {setDragType} = useDragContext()
    

    const saveColor = useCallback(()=> {
        setHeadList((x)=> {
                let y = [...x]
                y[index].color = currentColor; 
                return y;
             })
         setIsColorPickerVisible(false)
         setSaving(true)
    },[currentColor])

    const menuToggle = (e)=> {
        setMenuVisible(x => !x);
    }
    const menuHide = useCallback((e)=> {
        if(!(iconBtnRef?.current?.contains(e.target) || menuRef?.current?.contains(e.target))){
            setMenuVisible(false)
        }
        
       if(isColorPickerVisible && (colorRef?.current?.contains(e.target)) === false){
            saveColor()
        }
       
    },[isColorPickerVisible,saveColor])

    useEffect(() => {
        window.addEventListener('click',menuHide)
        return () => {
            window.removeEventListener('click',menuHide)
        }
    }, [menuHide])

    useEffect(() => {
        if(item.editMode)titleRef.current.focus()
    }, [item.editMode])

     const deleteList = ()=>{
        console.log('delete list')
        setItemList((x)=> {
            let y = {...x}
            delete y[item.id]
            return y
        })
        setHeadList((x)=> {
            let y = [...x]
            y = y.filter( z=> z!== y[index])
            return y
        })
        setSaving(true)
    }

     const editListHeader = ()=>{
        setHeadList((x)=> {
            let y = [...x]
            y[index].editMode = true; 
            return y;
        })
        setSaving(true)
    }

    const changeColor = (e) => {
        e.stopPropagation()
        setMenuVisible(false)
        setIsColorPickerVisible(true)
    }

    const changeLocalColor = (color)=> {
       
        setCurrentColor(color.hex)
        //  console.log('changing color',color)
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
        if(save)setSaving(true)
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
        setSaving(true)
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
            <div  data-index={index} draggable={true} onDragEnd={handleDragEnd} onDragStart={(e)=> drag(e)}  style={{'--bgColor':currentColor}} 
            className={`extraList-item`}>
                             <input ref={titleRef} onKeyUp={keyUpHandler} onBlur={saveHeader}  value={title} onChange={(e)=> setTitle(e.target.value)} disabled={!item.editMode} />
                             <div draggable={true} onDragStart={(e)=> {
                    e.preventDefault()
                    e.stopPropagation()
                    }} ref={iconBtnRef}  onClick={menuToggle} className='menu' >
                                <FontAwesomeIcon className='extraHeads-item_menu' icon={faEllipsisVertical} />  
                                {isColorPickerVisible && (<div onClick={(e)=>e.stopPropagation()} ref={colorRef} className='colorPicker'>
                                <SketchPicker    color={currentColor} onChange={changeLocalColor} />
                                </div>)}
                                {menuVisible && <Menu isLeft={true} ref={menuRef} menuList={menuList} onClick={menuHide} />}
                            </div>
                            
                         </div>     
                        </DragOverWrap>)
}



export default function ExtraHeads({list=[],preset=3,setHeadList,setItemList,createNewGroup,itemList,setSaving}) {

  return (list.length > 0) ? (
    <div  className='extraHeads'>
               <div className='extraHeads-head'>
                     <p>Hidden Groups </p>
                     <FontAwesomeIcon onClick={createNewGroup} className='extraHeads-head_btn' icon={faPlus} />
                </div>
                <div className='extraList'>
                    {list.map((l,i) => (<ExtraHeadItem setSaving={setSaving} itemList={itemList} setHeadList={setHeadList} setItemList={setItemList} index={i+preset} key={l.id} item={l} />))}
                </div>
    </div>  
  ): (<div  className='extraHeads'>
            <button className='extraHeads-newTaskGroup' onClick={createNewGroup}>
                Create Task Group
                <FontAwesomeIcon style={{marginLeft:'0.5rem'}}  icon={faPlus} />
                </button>
           
             </div>)
}
