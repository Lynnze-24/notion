import React from 'react'
import { Provider } from 'react-redux'
import store  from './store/store';
import DragProvider from './store/context/DragProvider';

const RootProvider = ({children}) => {
    return (
        <Provider store={store}>
            <DragProvider>
            {children}
            </DragProvider>
        </Provider>
    )
}

export default RootProvider