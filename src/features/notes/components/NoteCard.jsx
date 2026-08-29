import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoteCard = ({ note }) => {
    const navigate = useNavigate();

    const handleCardClick = ()=>{
        navigate(`/notes/${note._id}`);              // abhi ye pag enhi anay hai hai 

    }
    return (
        <div onClick={handleCardClick} className="border p-4 rounded cursor-pointer">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold">{note.title}</h2>

                {note.isPinned && (<span>

                    📌

                </span>)}


            </div>
            <p className='mt-2'>
                {note.content}
            </p>


        </div>
    )
}

export default NoteCard