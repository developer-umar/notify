import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getNotebyId, togglePinnote } from '../redux/notesSlice.js';
import { BsBookmarkFill } from 'react-icons/bs';
import { FiBookmark } from 'react-icons/fi';

const NoteDetails = () => {
    const { noteId } = useParams();
    const { selectedNote, getNotebyId: { loading, error }, togglePinNote: { loading: pinLoading, error: pinError } } = useSelector((state) => state.notes);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getNotebyId(noteId));

    }, [dispatch, noteId]);

    const handlePintoggle =()=>{

        togglePinnote(noteId);

    }


    if (loading) {
        return <p className='bg-amber-300 text-blue-600'>Loading note....</p>
    }

    if (error) {
        return <p className='bg-red-500'>{error}</p>
    }

    if (!selectedNote) {
        return <p>note not found</p>

    }




    return (

        <div className="max-w-3xl mx-auto p-4">

            <div className="border p-5 rounded">

                <div className="flex items-center justify-between">

                    <h1 className="text-xl font-semibold">
                        {selectedNote.title}
                    </h1>

                    <button
                        type='button'
                        onClick={handlePintoggle}
                        disabled={pinLoading}

                        title={
                            selectedNote.isPinned ? "Unpin note" : "Pin note"
                        }
                        className={`p-2 rounded-full border ${selectedNote.isPinned
                            ? "text-yellow-500"
                            : "text-gray-500"
                            }`}

                    >
                        {selectedNote.isPinned ? (<BsBookmarkFill size={20} />) :

                            (<FiBookmark size={20} />)
                        }

                    </button>



                </div>

                {pinError && (
                    <p className="text-red-500 mt-2">
                        {pinError}
                    </p>
                )}


                <p className="mt-4 whitespace-pre-wrap">
                    {selectedNote.content}
                </p>


            </div>

        </div>


    );
}

export default NoteDetails