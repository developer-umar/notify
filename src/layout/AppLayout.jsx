import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>

    <Navbar/>             

    <main>
        <Outlet/>
        
     </main>      
    </>
  )
}

export default AppLayout

// AppLayout
//    │
//    ├── Navbar
//    │
//    └── <Outlet />
//           ↓
//        Allnotes , yha pr piinned ho skta hai ya profile smjhe jo bhi iske andr children doonga routes pr sab display kar dega 