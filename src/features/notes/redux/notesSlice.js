import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllNotesApi } from "../api/noteApi";

export const getAllnotes = createAsyncThunk("notes/getAllnotes",async(_,thunkAPI)=>{

    try {
        return  await  getAllNotesApi();
        
    } catch (error) {
        
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong ");
        
    }

})





const initialState = {
    notes:[],
    getAllNotes:{
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


    }
});


export default noteSlice.reducer;