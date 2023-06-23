import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ListHead from '../../components/ListHead/ListHead'
import ListItems from '../../components/ListItems/ListItems'
import uniqueId from '../../utils/uniqueId'
import './Main.css'

const headListData=[
    {
      id:uniqueId('head'),
      title:'To do',
      color:'red',
      editMode:false
    },
    {
      id:uniqueId('head'),
      title:'Done',
      color:'green',
      editMode:false
    },
    {
      id:uniqueId('head'),
      title:'Doing',
      color:'yellow',
      editMode:false
    },
  ]
  
  const itemListData=[
    [
      { 
        id:uniqueId('task'),
        title:'take a bath',
        editMode:false
      },
    ],
    [
      { 
        id:uniqueId('task'),
        title:'wash face',
        editMode:false
      },
      { 
        id:uniqueId('task'),
        title:'brush teeth',
        editMode:false
      },
    ],
    [
      { 
        id:uniqueId('task'),
        title:'watch English series called Dexter',
        editMode:false
      },
      { 
        id:uniqueId('task'),
        title:'IELTS Listening Test 2',
        editMode:false
      },
    ]
  ]

const Main = () => {
    const [headList, setHeadList] = useState(headListData);
    const [itemList, setItemList] = useState(itemListData);

    const createNewGroup = ()=> {
      setHeadList(x => {
        let y = [...x,{
          id:uniqueId('head'),
          title:'',
          color:'white',
          editMode:true
        },]
        return y;
      })
      setItemList(x => {
        let y = [...x,[]]
        return y;
      })

    }
   
    return (
        <div className='Main'>
          <div className='MainHeader'>
             <h1>Tasks</h1>
             <div className='MainHeaderBtn'>
             <FontAwesomeIcon onClick={createNewGroup} fontSize={15}  icon={faPlus} />
             </div>
          </div>  
          
          {headList.length?(<>
          <ListHead 
          list={headList} 
          setItemList={setItemList} 
          setHeadList={setHeadList} 
          />
          <ListItems list={itemList} setItemList={setItemList} /> 
          </>):(
            <div className='noTaskGroup'>
            <h2>No Task Group Yet</h2>
            </div>
          )}
            
        </div>
    )
}

export default Main
