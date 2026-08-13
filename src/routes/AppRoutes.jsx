import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PinnedPage from '../pages/PinnedPage'
import ProfilePage from '../pages/ProfilePage'
import AllNotesPage from '../pages/AllNotesPage'

import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import NotFound from '../features/auth/pages/NotFound'
import ProtectedRoutes from './ProtectedRoutes'

const AppRoutes = () => {
  return (
    <Routes>

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />



      {/* koi unmatched url daale to  */}
      <Route element={<ProtectedRoutes />}  >
        <Route path='/all-notes' element={<AllNotesPage />} />
        <Route path='/pinned' element={<PinnedPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='*' element={<NotFound />} />

      </Route>



    </Routes>
  )
}

export default AppRoutes
