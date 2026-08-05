import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
    <div className='bg-amber-400 text-6xl '>My Notes APP </div>

    <AppRoutes/>
    
    </>


  )
}

export default App
