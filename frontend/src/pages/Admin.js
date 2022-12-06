import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Admin/Sidebar'




function Admin() {
    return(
        <div>
            <Sidebar/>
            <Outlet/>
            
        </div>
    )

}
export default Admin