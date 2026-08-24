import React from 'react'
import { Link } from 'react-router-dom'
import { LogoutButton } from "../features/auth/components/LogoutButton"

const Navbar = () => {
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

          <button>
            create
          </button>


          <LogoutButton />

          <Link
            to="/profile"
            className="w-9 h-9 border rounded-full flex items-center justify-center"
          >
            U
          </Link>

        </div>





      </div>
    </nav>
  )
}

export default Navbar