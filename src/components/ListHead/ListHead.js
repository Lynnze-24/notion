import { faCircle, faEdit, faEllipsisH, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import exchangeArrItem from '../../utils/exchangeArrItem'
import uniqueId from '../../utils/uniqueId'
import Menu from '../Menu/Menu'
import './ListHead.css'




const ListHeadItem = ({item,drag,drop,index,setItemList,setHeadList})=> {

    const createNewItem = ()=> {
       
        setItemList((x)=> {
            let y = [...x]
            y[index] = [...y[index],{id:uniqueId('item'),
        title:null,editMode:true}]
            return y;
        })
    }

    const menuRef = useRef()
    const iconBtnRef = useRef()
    const oldTitleRef = useRef()

    const [menuVisible, setMenuVisible] = useState(false)
    const [oldTitle, setOldTitle] = useState(false)

    const menuToggle = (e)=> {
        setMenuVisible(x => !x);
    }
    const menuHide = (e)=> {
        if(!(iconBtnRef?.current?.contains(e.target) || menuRef?.current?.contains(e.target))){
            setMenuVisible(false)
        }
        
    }
    const titleRef = useRef()
    useEffect(()=>{
        if(item.editMode){
           setOldTitle(titleRef.current.innerText);
            titleRef.current.focus()
        }
    },[item.editMode])

    useEffect(() => {
        window.addEventListener('click',menuHide)
        return () => {
            window.removeEventListener('click',menuHide)
        }
    }, [])

    const saveHeader = (save = true)=> {
        if(titleRef.current.innerText===''){
            if(oldTitleRef.current===''){
                setHeadList((x)=> {
                    let y = [...x]
                    y = y.filter((z,i) => i!== index)
                    return y;
                })
                setItemList( x => {
                    let y = [...x]
                    y = y.filter((z,i) => i!== index)
                    return y;
                })
            }else{
               
                setHeadList((x)=> {
                    let y = [...x]
                    y[index].editMode = false;
                    y[index].title = oldTitle
                    console.log(y)
                    return y;
                })
            }
            return;
        }
        setHeadList((x)=> {
            let y = [...x]
            y[index].editMode = false;
            if(save)y[index].title = titleRef.current.innerText;
            return y;
        })
    }

    const keyUpHandler =(e)=>{
        if(e.code === 'Enter') saveHeader()
        if(e.code === 'Escape') saveHeader(false)
    }
    

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
            label:'delete',
            icon:faTrash,
            action:deleteList
        },
        {
            label:'color',
            icon:faCircle,
            action:changeColor
        },
        {
            label:'edit',
            icon:faEdit,
            action:editListHeader
        }
    ]

    return(
        <div data-index={index} onDrop={(e)=> drop(e)} onDragOver={(e)=> e.preventDefault()}
            onDragEnter={(e)=> e.preventDefault()}>

        <div data-index={index} draggable={true} onDragStart={(e)=> drag(e)} className='outerCon'>
            <h5 onKeyUp={keyUpHandler} onBlur={saveHeader} contentEditable={item.editMode} ref={titleRef} style={{color:item.color}} >{item.title}</h5>
            <div className='headControls' >
                 <div ref={iconBtnRef}  onClick={menuToggle} className='menu'>
                    <FontAwesomeIcon className='iconButton' icon={faEllipsisH} />  
                    <input onChange={saveColor} ref={colorRef} type='color'  />
                   {menuVisible && <Menu ref={menuRef} menuList={menuList} onClick={menuHide} />}
                 </div>
                
                 <FontAwesomeIcon className='iconButton' onClick={createNewItem} icon={faPlus} />
            </div>
        </div>
        </div>
    )
}

const ListHead = ({list,setItemList,setHeadList}) => {

    const drag =(e) => {
        
        let data = e.target.getAttribute('data-index');
        e.dataTransfer.setData("idx", data);
        e.dataTransfer.setData("etype",'head');
    }

    

    const drop =(e) => {
        e.preventDefault()
        let etype = e.dataTransfer.getData("etype");
        if(etype !== 'head') return;
        let dropIdx = e.currentTarget.getAttribute('data-index');
        let dragIdx = e.dataTransfer.getData("idx");
        console.log('drag and drop',dragIdx,dropIdx)
        setHeadList(x => exchangeArrItem(dropIdx,dragIdx,x));
        setItemList(x => exchangeArrItem(dropIdx,dragIdx,x));
    }




    return (
        <div className='listHead'>
            {list.map((item,index) => 
            
            (<ListHeadItem 
              
            key={item.id} 
            setItemList={setItemList} 
            setHeadList={setHeadList}
            index={index} 
            item={item} 
            drag={drag} 
            drop={drop} 
            />))}
        </div>
    )
}

export default ListHead
