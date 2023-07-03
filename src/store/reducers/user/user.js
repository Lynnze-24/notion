import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    id:null,
    name:'',
    email:'',
    photoUrl:''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser:(state,action)=> {
          return action.payload;
    },
    emptyUser:(state)=>{
        return initialState;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUser,emptyUser} = userSlice.actions;
const userReducer = userSlice.reducer 


export default userReducer