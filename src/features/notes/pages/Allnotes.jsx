import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllnotes } from '../redux/notesSlice';
import NoteCard from '../components/NoteCard';


function Allnotes() {

  const dispatch = useDispatch();

  const { notes, getAllNotes: { loading, error } } = useSelector((state) => state.notes);


  useEffect(() => {
    dispatch(getAllnotes());

  }, [dispatch])

  if (loading) {
    return <p className='bg-amber-400'>Loading notes ....</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }


  return (


    <div className='max-w-4xl mx-auto p-4'>


      <h1 className="text-xl font-semibold mb-4">
        All Notes
      </h1>

      {
        notes.length === 0 ? (


          <p>No notes found .</p>

        ) : (

          <div  className ="space-y-3">

            {
              notes.map((note) => (


               <NoteCard  key={note._id}  note={note} />

              ))
            }


          </div>
        )

      }


    </div>
  );



}

export default Allnotes;
