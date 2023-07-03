import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user/user';

const store = configureStore({
  reducer: {
    user:userReducer,
  },
})

export const appState = store.getState();

export default store;