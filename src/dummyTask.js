import uniqueId from "./utils/uniqueId";

export const dummyTask=[
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