import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getCurrentUser } from './features/auth/redux/authSlice.js'


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{

    dispatch(getCurrentUser());

  },[dispatch])


  return (
    <>
    <div className='bg-amber-400 text-6xl '>My Notes APP </div>
    

    <AppRoutes/>
    
    </>


  )
}

export default App
