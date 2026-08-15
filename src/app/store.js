import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/redux/authSlice.js"

export const store = configureStore({
    reducer:{
        auth:authReducer
    }
})
