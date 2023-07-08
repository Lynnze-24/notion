import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import ListHead from '../../components/ListHead/ListHead'
import ListItems from '../../components/ListItems/ListItems'
import uniqueId from '../../utils/uniqueId'
import './Main.css'
import { useNavigate } from 'react-router-dom'
import ExtraHeads from '../../components/dashboardRelated/ExtraHeads/ExtraHeads'
import { collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useSelector } from 'react-redux'
import { db } from '../../firebase'
import LoadingGeneral from '../../components/loading/LoadingGeneral'
import { getLastUpdated } from '../../utils/formats'
import TaskDetails from '../../components/dashboardRelated/TaskDetails/TaskDetails'




const Main = () => {

    const [pageHeader,setPageHeader] = useState('Title')
    const [headList, setHeadList] = useState([]);
    const [loading, setloading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [itemList, setItemList] = useState(null);
    const [preset, setpreset] = useState(3);
    const [lastUpdated, setLastUpdated] = useState('');
    const [detailState, setDetailState] = useState({
      open:false,
      id:''
    });

    const userId = useSelector((state)=> state.user.id)


    
    
    const navigate = useNavigate();

    function changeColumnCount(){
            let renderPreset = innerWidth >= 1520 ? 5 :innerWidth >= 1260 ? 4 : innerWidth >= 1000 ? 3 : innerWidth >= 740 ? 2 : innerWidth >= 480 ? 1 : 0;
            setpreset(renderPreset)
    }

     async function savePageToDB(){
            try{
                let newDataList = headList.map((x) => ({...x,tasks:itemList[x.id]}))
                const docRef = doc(db, "users", userId,"pages","page12345");
                const currentTimeMilli = Date.now();
                await updateDoc(docRef,
                          {
                            details:newDataList,
                            updatedAt:currentTimeMilli
                })
                setLastUpdated(getLastUpdated(currentTimeMilli))
                console.log('saved',newDataList)
            }catch{
              console.log('error saving data to firebase')
            }
        
        }
    

   

    useEffect(()=>{
        const userValid = localStorage.getItem('userValidTime');
        if(!userValid || userValid < Date.now()){
            console.log('redirect')
            navigate('/home')
        }
        changeColumnCount()
        window.addEventListener('resize',changeColumnCount)
      
        async function bindPage(){

          try{
          
                let initialHeadList = [];
                let initialItemList = {}  
                
                const docRef = doc(db, "users", userId,"pages","page12345");
                const docSnap = await getDoc(docRef);

                  if (docSnap.exists()) {
                      let tasksData = docSnap.data();
                      console.log(tasksData)
                      tasksData.details.forEach(d => {
                      const {id,tasks, ...rest} = d;
                      initialHeadList.push({id,...rest});
                      initialItemList[id] = tasks;
                      setPageHeader(tasksData.name)
                      setLastUpdated(getLastUpdated(tasksData.updatedAt))
                      setHeadList(initialHeadList);
                      setItemList(initialItemList);
                      
                  })
                  
                  
                } else {
                  // docSnap.data() will be undefined in this case
                  console.log("No such document!");
                }
              

              
          }catch(e){
            console.log('failed',e)
          }finally{
            setloading(false)
          }
        }

        if(userId)bindPage()


        return ()=>{
           window.removeEventListener('resize',changeColumnCount)
        }
       
        
    },[userId])


   useEffect(()=>{
    if(saving){
      savePageToDB()
      setSaving(false)
    }
   },[saving])
   
    

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

    if(loading) return(<LoadingGeneral />)
   
    return (
        <div className='Main'>
          <div className='MainHeader'>
             <h1>{pageHeader}</h1>

          </div>  
          <p className='pageSave'>{lastUpdated}</p>
          
          {headList.length?(<div className='headAndListCon'>
            <div className='headAndListContent'>
          <ListHead 
          setSaving={setSaving}
          list={headList.slice(0,preset)} 
          setItemList={setItemList} 
          setHeadList={setHeadList} 
          />
          <ListItems setDetailState={setDetailState} setSaving={setSaving} headList={headList.slice(0,preset)} list={itemList} setItemList={setItemList} />
            </div> 
            <ExtraHeads setSaving={setSaving} itemList={itemList} preset={preset} createNewGroup={createNewGroup} setHeadList={setHeadList} setItemList={setItemList} list={headList.slice(preset)}/>
          </div>):(
            <div className='noTaskGroup'>
            <h2>There is no Task Group Yet.</h2>
            <button onClick={createNewGroup}>
              Create Task Group
              <FontAwesomeIcon style={{marginLeft:'0.5rem'}}  icon={faPlus} />
            </button>
            </div>
            
          )}
          <TaskDetails setDetailState={setDetailState} open={detailState.open} taskId={detailState.id} /> 
        </div>
    )
}

export default Main
