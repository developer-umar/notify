import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCurrentUserApi, loginUserApi, logoutUserApi, registerUserApi } from "../api/authApi.js";

export const registerUser = createAsyncThunk("auth/registerUser", async (formData, thunkAPI) => {

    try {
        return await registerUserApi(formData);


    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");


    }

})

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, thunkAPI) => {
    try {
        return await loginUserApi(credentials);

    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");

    }

})

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, thunkAPI) => {

    try {

        return await getCurrentUserApi();

    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data?.message || "Somtehing went wrong");

    }

})

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
    try {
        return await logoutUserApi();

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");

    }
})



const initialState = {
    user: null,
    isAuthenticated: false,
    isAuthInitilized:false,           //jab app load hoga uske dara jo loader age ausek liye 

    login: {
        loading: false,
        error: null
    },
    register: {
        loading: false,
        error: null
    },
    currentUser: {
        loading: false,
        error: null

    },
    logout: {
        loading: false,
        error: null
    }
}
// create slice automaticalaly action ar reducer object return karta hai yhi reducer ham neeche export kar arhe hai 

// new feaures creating  reset reducers  froa aal auths atates taakai sabko alaga alaga status clear akr skoo jo blogging application  wlaal eroro 

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        resetLoginState: (state) => {
            state.login.loading = false;
            state.login.error = null;
        },

        resetRegisterState: (state) => {
            state.register.loading = false;
            state.register.error = null;
        },

        resetCurrentUserState: (state) => {
            state.currentUser.loading = false;
            state.currentUser.error = null;
        },

        resetLogoutState: (state) => {
            state.logout.loading = false;
            state.logout.error = null;
        },
        // AGAR MAAN LO  AGAR USER LOGOUT HO GYA TO POORA AUTH USER RERSET KARAN HA SMJHE 
        clearAuthState:(state)=>{
            state.isAuthenticated = false;
            state.user = null;

            state.login.loading=false;
            state.login.error=null;

            state.register.loading = false;
            state.register.error=null;

            state.currentUser.loading=false;
            state.currentUser.error=null;

            state.logout.loading=false;
            state.logout.error=null;


        }

    },

    extraReducers: (builder) => {

        builder

            .addCase(registerUser.pending, (state) => {

                state.register.loading = true,
                    state.register.error = null

            })

            .addCase(registerUser.fulfilled, (state) => {
                state.register.loading = false,
                    state.register.error = null

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.register.loading = false,
                    state.register.error = action.payload
            })

            // login user reducers 

            .addCase(loginUser.pending, (state) => {
                state.login.loading = true,
                    state.login.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.login.loading = false,
                    state.login.error = null,
                    state.user = action.payload.data,
                    state.isAuthenticated = true

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.login.loading = false,
                    state.login.error = action.payload

            })

            // get CurrentUser 

            .addCase(getCurrentUser.pending, (state) => {
                state.currentUser.loading = true,
                    state.currentUser.error = null

            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.currentUser.loading = false;
                    state.currentUser.error = null;
                    state.user = action.payload.data;
                    state.isAuthInitilized=true;
                    state.isAuthenticated = true;
            })

            .addCase(getCurrentUser.rejected, (state, action) => {
                state.currentUser.loading = false;
                    state.currentUser.error = action.payload;
                    state.user = null;
                    state.isAuthInitilized=true;
                    state.isAuthenticated = false;
            })

            // logOut User 

            .addCase(logoutUser.pending, (state) => {
                state.logout.loading = true,
                    state.logout.error = null
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.logout.loading = false,
                    state.logout.error = null,
                    state.user = null,
                    state.isAuthenticated = false
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.logout.loading = false,
                    state.logout.error = action.payload
            })

    }
})

export const {resetLoginState,resetRegisterState,resetCurrentUserState,resetLogoutState,clearAuthState}=authSlice.actions;

export default authSlice.reducer;