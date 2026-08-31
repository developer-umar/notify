import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogoutButton } from "../features/auth/components/LogoutButton"
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <nav className="border-b p-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">


        {/* left div for logo  */}
        <div >
          <Link to={"/all-notes"}>
            Notrify

          </Link>

        </div>

        {/* centre div for serach bar  */}

        <div>
          <input
            type='text'
            placeholder='Search notes...'
            className='border px-3 py-2 rounded'

          />
        </div>

        {/* right div  */}

        <div className="flex items-center gap-3">

          <Link to={'/all-notes'}>
            All notes
          </Link>


          <Link to={'/pinned'}>
            Pinned notes

          </Link>

          <button onClick={()=>navigate('/create-note')}>
            create
          </button>


          <LogoutButton />

          <Link
            to="/profile"
            className="w-9 h-9 border rounded-full flex items-center justify-center"
          >


            {user?.avatar ? (<img src={user.avatar} alt="Avatar"
              className="w-full h-full object-cover" />) : (<span>U</span>)}


          </Link>

        </div>





      </div>
    </nav>
  )
}

export default Navbar