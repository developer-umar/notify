import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/redux/authSlice.js"
import notesReducer from "../features/notes/redux/notesSlice.js"

export const store = configureStore({
    reducer:{
        auth:authReducer,
        notes:notesReducer
    }
})



