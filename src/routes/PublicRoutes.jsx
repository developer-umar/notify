import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
            

    const {isAuthInitilized,isAuthenticated} =  useSelector((state)=>state.auth);

        if(!isAuthInitilized){

            return <div className='bg-green-200 text-3xl'> authenticating ...... </div>

        }

        if(isAuthenticated){

            return <Navigate to={"/all-notes"}  replace />
             
        }


        return <Outlet/>

        

    

}

export default PublicRoutes;