import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteNote, getNotebyId, togglePinnote } from '../redux/notesSlice.js';
import { BsBookmarkFill } from 'react-icons/bs';
import { FiBookmark } from 'react-icons/fi';

const NoteDetails = () => {
    const [successDeleted, setsuccessDeleted ] = useState(false); //state for handling popup notification after delete
    const { noteId } = useParams();
    const navigate = useNavigate();
    const { selectedNote, getNotebyId: { loading, error }, togglePinNote: { loading: pinLoading, error: pinError }, deletenote: { loading: deleteLoading, error: deleteError } } = useSelector((state) => state.notes);
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getNotebyId(noteId));

    }, [dispatch, noteId]);

    const handlePintoggle = () => {

        dispatch(togglePinnote(noteId));
        console.log("handle toggle pinned ")

    }

    const handleDeleteNote = async () => {
        try {
            await dispatch(deleteNote(noteId)).unwrap();
            setsuccessDeleted(true);

            setTimeout(() => {
                navigate('/all-notes', { replace: true });
            }, 1500);


        } catch (error) {
            console.log(error);

        }


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
        <div>
            {successDeleted && (
                <div className="fixed top-5 right-5 bg-white border shadow-lg rounded-lg px-5 py-3">
                    <p className="font-medium text-green-600">
                        Note deleted successfully
                    </p>
                </div>
            )}

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


                    {/* delete button */}

                    <div className='mt-4'>

                        <button
                            type='button'
                            onClick={handleDeleteNote}
                            disabled={deleteLoading}
                            className='border px-3 py-2 rounded'>


                            {deleteLoading ? 'deleting note...' : ' delete note'}

                        </button>

                        {deleteError && (
                            <p className="text-red-500 mt-2">
                                {deleteError}
                            </p>
                        )}



                    </div>



                    <div>

                    </div>


                    <p className="mt-4 whitespace-pre-wrap">
                        {selectedNote.content}
                    </p>


                </div>

            </div>

        </div>


    );
}

export default NoteDetails