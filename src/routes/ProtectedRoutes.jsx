import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

  const { isAuthenticated, isAuthInitilized } = useSelector((state) => state.auth);
  //   agar user authenticated nhi hai to 
  // agar auth initilized ho rha hai to loading ar ho gya fir authentication check ho gya to  children display 
  // else  login page redirect 
//   Ab initialization race-condition fix karte hain. Ye auth flow ka important part hai.

// Abhi problem ye hai:

// App start
//    ↓
// isAuthenticated = false
//    ↓
// getCurrentUser() API abhi chal rahi hai
//    ↓
// ProtectedRoute check karta hai
//    ↓
// false
//    ↓
// Login par redirect ❌

// Hume ek state chahiye jo bataye: isAuthInitilized

"Kya app ne authentication check complete kar liya?"
  if (!isAuthInitilized) {
    return <div className='bg-yellow-400 text-red-600 text-2xl'>Loading ......</div>

  }
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />

  }

  // agar user   hai authentiacted to uske andr walla coponet   ka cess dedo 

  return <Outlet />
}

export default ProtectedRoutes