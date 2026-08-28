import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PinnedPage from '../pages/PinnedPage'
import ProfilePage from '../pages/ProfilePage'

import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import NotFound from '../features/auth/pages/NotFound'
import ProtectedRoutes from './ProtectedRoutes'
import Allnotes from '../features/notes/pages/Allnotes'
import HomePage from '../pages/HomePage'
import PublicRoutes from './PublicRoutes'
import AppLayout from '../layout/AppLayout'
import CreateNote from '../features/notes/pages/CreateNote'

const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes  */}
      
      <Route element={<PublicRoutes/>}>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<HomePage/>} />

      </Route>

     

    



      {/* koi unmatched url daale to  */}
      <Route element={<ProtectedRoutes />}  >
      <Route   element={<AppLayout/>} >
        <Route path='/all-notes' element={<Allnotes />} />
        <Route path='/pinned' element={<PinnedPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/create-note' element={<CreateNote/>} />

      </Route>
      </Route>

        {/* for unknown routes   isko hamesha last em hi rkhna agar oopr rakhoge to  phle ye url se match kar lege uske necche wale koi bhi page pr redirect nhi ho paenge*/}
      <Route path='*' element={<NotFound />} />



    </Routes>
  )
}

export default AppRoutes
