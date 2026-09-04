import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createNoteApi, deletNoteApi, getAllNotesApi, getNoteByIdApi, togglePinNoteApi } from "../api/noteApi";


export const getAllnotes = createAsyncThunk("notes/getAllnotes", async (_, thunkAPI) => {

    try {
        return await getAllNotesApi();

    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong ");

    }

})


export const createNote = createAsyncThunk("notes/createnotes", async (noteData, thunkAPI) => {

    try {
        return await createNoteApi(noteData);

    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");

    }

})
// get note by id 

export const getNotebyId = createAsyncThunk("notes/getNotebyId", async (getNotebyId, thunkAPI) => {

    try {
        return await getNoteByIdApi(getNotebyId);

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");

    }

})

//  pinned notes 

export const togglePinnote = createAsyncThunk("notes/togglePinnote", async (noteId, thunkAPI) => {

    try {
        return await togglePinNoteApi(noteId);

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");

    }

})


export const deleteNote = createAsyncThunk(async(noteId,thunkAPI)=>{

    try {
        return await  deletNoteApi(noteId);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
    }

})




const initialState = {
    notes: [],
    selectedNote: null,
    getAllNotes: {
        loading: false,
        error: null
    },

    createNote: {
        loading: false,
        error: null
    },
    getNotebyId: {
        loading: false,
        error: null
    },
    togglePinNote: {
        loading: false,
        error: null

    },
    deletenote:{
        loading:false,
        error:null
    }

}

const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(getAllnotes.pending, (state) => {
                state.getAllNotes.loading = true;
                state.getAllNotes.error = null;


            })
            .addCase(getAllnotes.fulfilled, (state, action) => {
                state.getAllNotes.loading = false;
                state.getAllNotes.error = null;
                state.notes = action.payload.data;


            })

            .addCase(getAllnotes.rejected, (state, action) => {
                state.getAllNotes.loading = false;
                state.getAllNotes.error = action.payload;
            })


            .addCase(createNote.pending, (state) => {
                state.createNote.loading = true;
                state.createNote.error = null;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.createNote.loading = false;
                state.createNote.error = null;

                state.notes.unshift(action.payload.data);       //unshift front me add kar deta hai 
                //   unshift Isse Create ke baad dobara getAllNotes() call karne ki zarurat nahi padegi.
            })
            .addCase(createNote.rejected, (state, action) => {
                state.createNote.loading = false;
                state.createNote.error = action.payload;
            })


            .addCase(getNotebyId.pending, (state) => {

                state.getNotebyId.loading = true;
                state.getNotebyId.error = null;
                state.selectedNote = null;

            })
            .addCase(getNotebyId.fulfilled, (state, action) => {
                state.getNotebyId.loading = false;
                state.getNotebyId.error = null;

                state.selectedNote = action.payload.data;

            })
            .addCase(getNotebyId.rejected, (state, action) => {
                state.getNotebyId.loading = false;
                state.getNotebyId.error = action.payload;
                state.selectedNote = null;
            })

            // important pinned notes  important logic concept

            .addCase(togglePinnote.pending, (state) => {
                state.togglePinNote.loading=true;
                state.togglePinNote.error=null;

            })
            .addCase(togglePinnote.fulfilled,(state,action)=>{
                state.togglePinNote.loading=false;
                state.togglePinNote.error=null;

                const updatedNote = action.payload.data;

                state.selectedNote = updatedNote;

                // immediate ui effect ke liye  all notes wala  array bhi update karenge abhi 

            //   find karo wo  index wlala notes jo chnage hua hai unko kahali immediate change karo ui ke liye 

                const index =  state.notes.findIndex((note)=>note._id === updatedNote._id);

                if(index != -1){
                    state.notes[index] = updatedNote;
                }



            })
            .addCase(togglePinnote.rejected,(state,action)=>{
                state.togglePinNote.loading=false;
                state.togglePinNote.error=action.payload;
            })

            // delete note 


            .addCase(deleteNote.pending,(state)=>{
                state.deletenote.loading=true;
                state.deletenote.error=null;
            })
            .addCase(deleteNote.fulfilled,(state)=>{
                state.deletenote.loading=false;                 //yha delete note me  manual update nhi karenege kuki  delete karn eke baad automatically wo all notes page pr chalaa jaega smjhe  wha apane aap hi usfefect se new list fetch hog to dleeted notes shso w nhi hog a smjhe 
                state.deletenote.error=null;
            })
            .addCase(deleteNote.rejected,(state,action)=>{
                state.deletenote.loading=false;
                state.deletenote.error = action.payload;
                
            })


    }
});


export default noteSlice.reducer;

// const notes = [{id:1,name:"umar"},{id:2,name:"abdul rehman"}];

// let ans=1 ;
// export  const getelementbyId = (id)=>{

//      ans = notes.filter((note)=>{
//     return  note.id == id
// })

// }

// getelementbyId(2);
// console.log(ans);
