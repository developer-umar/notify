import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createNoteApi, getAllNotesApi } from "../api/noteApi";


export const getAllnotes = createAsyncThunk("notes/getAllnotes",async(_,thunkAPI)=>{

    try {
        return  await  getAllNotesApi();
        
    } catch (error) {
        
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong ");
        
    }

})


export const createNote = createAsyncThunk("notes/createnotes",async(noteData,thunkAPI)=>{

    try {
        return await createNoteApi(noteData);
        
    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
        
    }

})





const initialState = {
    notes:[],
    getAllNotes:{
        loading:false,
        error:null
    },

    createNote:{
        loading:false,
        error:null
    }

}

const noteSlice = createSlice({
    name:"notes",
    initialState,
    reducers:{},

    extraReducers:(builder)=>{

        builder

        .addCase(getAllnotes.pending ,(state)=>{
            state.getAllNotes.loading  = true;
            state.getAllNotes.error =  null;


        })
        .addCase(getAllnotes.fulfilled,(state,action)=>{
            state.getAllNotes.loading=false;
            state.getAllNotes.error=null;
            state.notes =action.payload.data;


        })

        .addCase(getAllnotes.rejected,(state,action)=>{
            state.getAllNotes.loading = false;
            state.getAllNotes.error = action.payload;
        })


        .addCase(createNote.pending,(state)=>{
            state.createNote.loading=true;
            state.createNote.error=null;
        })
        .addCase(createNote.fulfilled,(state,action)=>{
            state.createNote.loading=false;
            state.createNote.error=null;

            state.notes.unshift(action.payload.data);       //unshift front me add kar deta hai 
        //   unshift Isse Create ke baad dobara getAllNotes() call karne ki zarurat nahi padegi.
        })
        .addCase(createNote.rejected,(state,action)=>{
            state.createNote.loading=false;
            state.createNote.error=action.payload;
        })


    }
});


export default noteSlice.reducer;