import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    const {isAuthenticated} = useSelector((state)=>state.auth);
//   agar user authenticated nhi hai to 
  if(!isAuthenticated){
    return <Navigate  to='/login'   replace />

  }

// agar user   hai authentiacted to uske andr walla coponet   ka cess dedo 

  return <Outlet/>
}

export default ProtectedRoutes