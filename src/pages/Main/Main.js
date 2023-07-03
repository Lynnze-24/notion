import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import ListHead from '../../components/ListHead/ListHead'
import ListItems from '../../components/ListItems/ListItems'
import uniqueId from '../../utils/uniqueId'
import './Main.css'
import { useNavigate } from 'react-router-dom'
import ExtraHeads from '../../components/dashboardRelated/ExtraHeads/ExtraHeads'

const data=[
    {
      id:'head10',
      title:'To do',
      color:'red',
      editMode:false,
      tasks:[
      { 
        id:uniqueId('task'),
        title:'take a bath',
        editMode:false,
      }, 
    ],
    },
    {
      id:'head11',
      title:'Done',
      color:'green',
      editMode:false,
      tasks:[
        { 
          id:uniqueId('task'),
          title:'wash face',
          editMode:false,
        },
        { 
          id:uniqueId('task'),
          title:'brush teeth',
          editMode:false,
        },
      ],
    },
    {
      id:'head12',
      title:'Doing',
      color:'yellow',
      editMode:false,
      tasks:[
        { 
          id:uniqueId('task'),
          title:'watch English series called Dexter',
          editMode:false,
        },
        { 
          id:uniqueId('task'),
          title:'IELTS Listening Test 2',
          editMode:false,
        },
      ],
    },
    {
      id:'head13',
      title:'next hour',
      color:'yellow',
      editMode:false,
      tasks:[]
    },
    {
      id:'head14',
      title:'nextday hahhahah hahhahaha',
      color:'blue',
      editMode:false,
       tasks:[]
    },
  ]


const Main = () => {


    const [headList, setHeadList] = useState([]);
    const [itemList, setItemList] = useState(null);
    const [preset, setpreset] = useState(3);


    
    const navigate = useNavigate();

    function changeColumnCount(){
            let renderPreset = innerWidth >= 1520 ? 5 :innerWidth >= 1260 ? 4 : innerWidth >= 1000 ? 3 : innerWidth >= 740 ? 2 : innerWidth >= 480 ? 1 : 0;
            setpreset(renderPreset)
    }

    useEffect(()=>{
        const userValid = localStorage.getItem('userValidTime');
        if(!userValid || userValid < Date.now()){
            console.log('redirect')
            navigate('/home')
        }
        changeColumnCount()
        window.addEventListener('resize',changeColumnCount)

        let initialHeadList = [];
        let initialItemList = {}  
        
        data.forEach(d => {
            const {id,tasks, ...rest} = d;
            initialHeadList.push({id,...rest});
            initialItemList[id] = tasks;
        })

        setHeadList(initialHeadList);
        setItemList(initialItemList);
        
    },[])


   
    

    const createNewGroup = ()=> {
      let newHeadId = uniqueId('head');
      setHeadList(x => {
        let y = [...x,{
          id:newHeadId,
          title:'',
          color:'white',
          editMode:true
        },]
        return y;
      })
      setItemList(x => ({...x,[newHeadId]:[]}))

    }
   
    return (
        <div className='Main'>
          <div className='MainHeader'>
             <h1>Tasks</h1>
             
          </div>  
          
          {headList.length?(<div className='headAndListCon'>
            <div className='headAndListContent'>
          <ListHead 
    
          list={headList.slice(0,preset)} 
          setItemList={setItemList} 
          setHeadList={setHeadList} 
          />
          <ListItems headList={headList.slice(0,preset)} list={itemList} setItemList={setItemList} />
            </div> 
            <ExtraHeads itemList={itemList} preset={preset} createNewGroup={createNewGroup} setHeadList={setHeadList} setItemList={setItemList} list={headList.slice(preset)}/>
          </div>):(
            <div className='noTaskGroup'>
            <h2>There is no Task Group Yet.</h2>
            <button onClick={createNewGroup}>
              Create Task Group
              <FontAwesomeIcon style={{marginLeft:'0.5rem'}}  icon={faPlus} />
            </button>
            </div>
            
          )}
       
        </div>
    )
}

export default Main
