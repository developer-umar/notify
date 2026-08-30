import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getNotebyId } from '../redux/notesSlice.js';

const NoteDetails = () => {
    const {noteId} = useParams();
    const {selectedNote,getNotebyId:{loading,error}} = useSelector((state)=>state.notes);
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(getNotebyId(noteId));

    },[dispatch,noteId]);


    if(loading){
      return   <p className='bg-amber-300 text-blue-600'>Loading note....</p>
    }

    if(error){
       return   <p className='bg-red-500'>{error}</p>
    }

    if(!selectedNote){
        return  <p>note not found</p>

    }




  return (
   
    <div className="max-w-3xl mx-auto p-4">

            <div className="border p-5 rounded">

                <div className="flex items-center justify-between">

                    <h1 className="text-xl font-semibold">
                        {selectedNote.title}
                    </h1>

                    {selectedNote.isPinned && (
                        <span>
                            📌
                        </span>
                    )}

                </div>


                <p className="mt-4 whitespace-pre-wrap">
                    {selectedNote.content}
                </p>


            </div>

        </div>


  );
}

export default NoteDetails