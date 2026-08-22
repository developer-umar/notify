import api from "../../../services/axios.js";

export const createNoteApi = async(noteData)=>{

    const response = await api.post("/notes/create-notes",noteData);
    return response.data;

}

export const getAllNotesApi = async()=>{

    const response = await api.get("/notes/getallnotes");

    return response.data;
}


export const  getNoteByIdApi  = async(noteId)=>{
    const response = await api.get(`/notes/get-notes/${noteId}`);
    return response.data;
}

export const updateNoteApi  = async(noteId,noteData)=>{

    const response = await api.patch(`/notes/update-notes/${noteId}`,noteData);
    return response.data;

}
// delete notes 

export const deletNoteApi = async(noteId)=>{

    const response = await api.delete(`/notes/delete-notes/${noteId}`);
    return response.data;

}

export const togglePinNoteApi = async (noteId) => {

    const response = await api.patch(
        `/notes/pin/${noteId}`
    );

    return response.data;
};

export const searchNotesApi = async (search) => {

    const response = await api.get(
        `/notes/search?q=${encodeURIComponent(search)}`
    );
// encodeURIComponent "User ke search text ko safely URL ke query parameter ke andar bhejna.
    return response.data;
};