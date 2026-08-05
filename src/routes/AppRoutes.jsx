import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

import PinnedPage from '../pages/PinnedPage'
import ProfilePage from '../pages/ProfilePage'
import AllNotesPage from '../pages/AllNotesPage'

const AppRoutes = () => {
  return (
    <Routes>

        <Route  path='/login'   element={<LoginPage/>}  />
        <Route  path='/register'   element={<RegisterPage/>}  />
        
        <Route  path='/all-notes'   element={<AllNotesPage/>}  />
        <Route  path='/pinned'   element={<PinnedPage/>}  />
        <Route  path='/profile'   element={<ProfilePage/>}  />


        
    </Routes>
  )
}

export default AppRoutes
