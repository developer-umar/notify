import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createNoteApi, getAllNotesApi, getNoteByIdApi } from "../api/noteApi";


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
// get note by id 

export const getNotebyId = createAsyncThunk("notes/getNotebyId",async(getNotebyId,thunkAPI)=>{

    try {
       return  await getNoteByIdApi(getNotebyId);
        
    } catch (error) {
       return  thunkAPI.rejectWithValue(error.response?.data?.message ||"Something went wrong");
        
    }

})





const initialState = {
    notes:[],
    selectedNote:null,
    getAllNotes:{
        loading:false,
        error:null
    },

    createNote:{
        loading:false,
        error:null
    },
    getNotebyId:{
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


        .addCase(getNotebyId.pending,(state)=>{

            state.getNotebyId.loading=true;
            state.getNotebyId.error=null;
            state.selectedNote=null;

        })
        .addCase(getNotebyId.fulfilled,(state,action)=>{
            state.getNotebyId.loading=false;
            state.getNotebyId.error=null;

            state.selectedNote=action.payload.data;

        })
        .addCase(getNotebyId.rejected,(state,action)=>{
            state.getNotebyId.loading=false;
            state.getNotebyId.error=action.payload;
            state.selectedNote=null;
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
