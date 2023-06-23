import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { forwardRef } from 'react'
import './Menu.css'

const MenuItem =({item})=>{
    return(
        <div onClick={item.action} className='MenuItem'>
           
            <FontAwesomeIcon icon={item.icon} />
            <p>{item.label}</p>
        </div>
    )
}

const Menu = forwardRef(({menuList,onClick},ref) => {
    return (
        <div ref={ref} onClick={onClick}  className='Menu' style={{top: '100%',
                                                        left: 0}}>
            {menuList.map((menu,index) => <MenuItem key={index} item={menu} />)}
        </div>
    )
})

export default Menu
