import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  logoutUser } from '../redux/authSlice'
import { replace, useNavigate } from 'react-router-dom'

const LogoutButton = () => {

    const {loading,error} = useSelector((state)=>state.auth.logout)
    const dispatch = useDispatch();
    const navigate = useNavigate()




    const handleLogout =async()=>{
        try {

            await dispatch(logoutUser()).unwrap();
            navigate('/',{replace:true});
            
        } catch (error) {
            console.log(error);
            
        }

    }
  return (
    <div>

        <button onClick={handleLogout} disabled={loading} className="border px-3 py-2 rounded bg-red-600">

            {loading  ? "Logging Out ..........." :"Logout"}

            {error && (
             <p className='text-red-500'>
                {error}
             </p>
            )}

        </button>
      
    </div>
  )
}

export default LogoutButton
