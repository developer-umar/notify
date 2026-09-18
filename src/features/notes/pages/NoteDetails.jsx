import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteNote, getNotebyId, togglePinnote, updateNote } from '../redux/notesSlice.js';
import { BsBookmarkFill } from 'react-icons/bs';
import { FiBookmark } from 'react-icons/fi';

const NoteDetails = () => {
    const [successDeleted, setsuccessDeleted] = useState(false); //state for handling popup notification after delete
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ title: "", content: "" });
    const [sucessEdit ,setSuccessEdit] = useState(false);  //edit pop up handle karne ke liye 
    const { noteId } = useParams();
    const navigate = useNavigate();
    const { selectedNote, getNotebyId: { loading, error }, togglePinNote: { loading: pinLoading, error: pinError }, deletenote: { loading: deleteLoading, error: deleteError }, updatenote: { loading: updateLoading, error: updateError } } = useSelector((state) => state.notes);
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getNotebyId(noteId));

    }, [dispatch, noteId]);

    const handlePintoggle = () => {

        dispatch(togglePinnote(noteId));
        console.log("handle toggle pinned ")

    }
    // edit handles

    const handleEdit = () => {
        setEditData({
            title: selectedNote.title,
            content: selectedNote.content
        })

        setIsEditing(true);

    }

    const handleEditChange = (e) => {

        const { name, value } = e.target;
        setEditData((prev) => (
            { ...prev, [name]: value }
        ))



    }

    const handleUpdateNote = async () => {
        // console.log(noteId);
        // console.log(typeof(noteId));
        // console.log(editData);
        try {

            await dispatch(updateNote({noteId, noteData: editData })).unwrap();
            setIsEditing(false);
            setSuccessEdit(true);       //notification popup ko true kar rahe 

            // thodi der baad popup chala jaega isliye  ste timoutme false karenge 

            setTimeout(()=>{

                setSuccessEdit(false);  // taaki notification chala jaae 

            },1500)

        } catch (error) {
            console.log(error);
        }
    }


    // delete handles 

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

            {
                sucessEdit && (
            <div className="fixed top-5 right-5 bg-white border shadow-lg rounded-lg px-5 py-3 z-50">
                <p className="font-medium text-green-600">
                    Note updated successfully
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

                    {/* Edit Button */}

                    <div className='mt-4 flex gap-2'>

                        <button

                            type='button'
                            onClick={handleEdit}
                            className='border px-3 py-2 rounded'>
                            Edit
                        </button>



                    </div>

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



                        {/* yha s ecod elikhan hai ui ka editing walal  */}





                        {isEditing ? <div className="mt-4 space-y-3">

                            <input
                                type='text'
                                name='title'
                                value={editData.title}
                                onChange={handleEditChange}
                                className='w-full border p-2 rounded'
                            />


                            <textarea
                                name='content'
                                value={editData.content}
                                onChange={handleEditChange}
                                className='w-full border p-2 rounded'
                                rows="8"

                            />


                            <div>
                                <button
                                    type='button'
                                    onClick={handleUpdateNote}
                                    disabled={updateLoading}
                                    className='border px-3 py-2 rounded'>

                                    {updateLoading ? "Saving.." : "Save"}
                                </button>

                                <button
                                    type='button'
                                    onClick={() => setIsEditing(false)}
                                    className='border px-3 py-2 rounded'>

                                    Cancel

                                </button>

                            </div>

                            {updateError && (
                                <p className="text-red-500">
                                    {updateError}
                                </p>
                            )}



                        </div>
                            : (<p className="mt-4 whitespace-pre-wrap">
                                {selectedNote.content}
                            </p>)


                        }


                    </div>

                </div>

            </div>







        </div>



    );
}

export default NoteDetails



