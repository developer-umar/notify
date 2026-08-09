import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PinnedPage from '../pages/PinnedPage'
import ProfilePage from '../pages/ProfilePage'
import AllNotesPage from '../pages/AllNotesPage'

import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import NotFound from '../features/auth/pages/NotFound'

const AppRoutes = () => {
  return (
    <Routes>

        <Route  path='/login'   element={<Login/>}  />
        <Route  path='/register'   element={<Register/>}  />
        <Route   path='*' element={<NotFound/>}  />           
        {/* koi unmatched url daale to  */}
        
        <Route  path='/all-notes'   element={<AllNotesPage/>}  />
        <Route  path='/pinned'   element={<PinnedPage/>}  />
        <Route  path='/profile'   element={<ProfilePage/>}  />


        
    </Routes>
  )
}

export default AppRoutes
