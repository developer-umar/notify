import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNote } from '../redux/notesSlice';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {

    const [formData, setFormData] = useState({ title: "", content: "" });

    const { loading, error } = useSelector((state) => state.notes.createNote);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handle_Change = (e) => {

        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData, [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createNote(formData)).unwrap();
            navigate('/all-notes', { replace: true });


        } catch (error) {
            console.log(error);

        }
    }


    return (

        <div className="max-w-xl mx-auto p-4">

            <h1 className="text-xl font-semibold mb-4">Create note Page</h1>

            {error && <p className='bg-red-500 text-amber-50'>{error}</p>};


            <form onSubmit={handleSubmit}>

                <input
                    type='text'
                    name='title'
                    placeholder='Enter Title'
                    value={formData.title}
                    onChange={handle_Change}
                    className="w-full border p-2 mb-3 rounded"
                />

                <textarea
                    name='content'
                    placeholder='Write  your note....'
                    value={formData.content}
                    onChange={handle_Change}
                    rows={8}
                    className="w-full border p-2 mb-3 rounded"

                />

                <button type='submit' disabled={loading} className="w-full bg-black text-white py-2 rounded">


                    {loading ? "creating...." : "create note"}
                </button>




            </form>



        </div>
    )
}

export default CreateNote