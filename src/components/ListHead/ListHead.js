import { faCircle, faEdit, faEllipsisH, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import exchangeArrItem from '../../utils/exchangeArrItem'
import uniqueId from '../../utils/uniqueId'
import Menu from '../Menu/Menu'
import './ListHead.css'
import DragOverWrap from '../DragOverWrap/DragOverWrap'
import { useDragContext } from '../../store/context/DragProvider'




const ListHeadItem = ({item,drag,drop,index,setItemList,setHeadList})=> {

    const createNewItem = ()=> {
       
        setItemList((x)=> {
            let y = {...x}
            y[item.id] = [...y[item.id],{id:uniqueId('item'),
        title:'',editMode:true}]
            return y;
        })
    }

    const menuRef = useRef()
    const iconBtnRef = useRef();
    const titleRef = useRef()

    
   

    const [menuVisible, setMenuVisible] = useState(false)
    const [title, setTitle] = useState(item.title)

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
            let y = {...x}
            delete y[item.id]
            return y
        })
        setHeadList((x)=> {
            let y = [...x]
            y = y.filter( z=> z.id!== item.id)
            return y
        })
    }

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
    

    
    const editListHeader = ()=>{
        setHeadList((x)=> {
            let y = [...x]
            y[index].editMode = true; 
            return y;
        })
    }

    const colorRef = useRef()

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

     const handleDragEnd = (e )=> {
        e.preventDefault()
        e.target.classList.remove('hidden')
    }

    return(
        <DragOverWrap etype='head' className='listHeadCon-item'  data-index={index} drop={drop}>

        <div data-index={index} draggable={true} onDragEnd={handleDragEnd} onDragStart={(e)=> drag(e)} className='outerCon'>
            <input style={{'--headTxtColor':item.color}} ref={titleRef} disabled={!item.editMode} onChange={(e)=> setTitle(e.target.value)} value={title} onKeyUp={keyUpHandler} onBlur={saveHeader}    />
            <div className='headControls' >
                 <div ref={iconBtnRef}  onClick={menuToggle} className='menu'>
                    <FontAwesomeIcon className='iconButton' icon={faEllipsisH} />  
                    <input onChange={saveColor} ref={colorRef} type='color'  />
                   {menuVisible && <Menu ref={menuRef} menuList={menuList} onClick={menuHide} />}
                 </div>
                
                 <FontAwesomeIcon className='iconButton' onClick={createNewItem} icon={faPlus} />
            </div>
        </div>
        </DragOverWrap>
    )
}

const ListHead = ({list,setItemList,setHeadList}) => {

    const {setDragType} = useDragContext()

     const dragHead =(e) => {
        let data = e.target.getAttribute('data-index');
        e.dataTransfer.setData("idx", data);
        e.dataTransfer.setData("etype",'head');
        setDragType('head')
        e.target.classList.add('hidden')
    }

    

    const dropHead =(e) => {
        e.preventDefault()
        let etype = e.dataTransfer.getData("etype");
        if(etype !== 'head') return;
        let dropIdx = e.currentTarget.getAttribute('data-index');
        let dragIdx = e.dataTransfer.getData("idx");
        setHeadList((prev)=> exchangeArrItem(dragIdx,dropIdx,prev))
        setDragType('')
        e.target.classList.remove('hidden')
    }


    return (
        <div className='listHead'>
            {list.map((item,index) => 
            
            (<ListHeadItem 
             index={index} 
            key={item.id} 
            setItemList={setItemList} 
            setHeadList={setHeadList}
            item={item} 
            drag={dragHead} 
            drop={dropHead} 
            />))}
        </div>
    )
}

export default ListHead
