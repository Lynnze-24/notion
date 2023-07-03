import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from './SideMenu'
import './Layout.css'


export default function MainLayout() {
  return (
    <div className='mainLayout'>
        <SideMenu />
        <Outlet />
    </div>
  )
}
