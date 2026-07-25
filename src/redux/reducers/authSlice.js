import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

export const registerThunk = createAsyncThunk("auth/register", async(registerData) => {
    const res = await authApi.register(registerData)
    return res
})

export const loginThunk = createAsyncThunk("auth/login", async (loginData) => {
    const res = await authApi.login(loginData)
    return res
})

export const logoutThunk = createAsyncThunk("auth/logout", async() => {
    const res = await authApi.logout()
    return res
})

export const getCurrentUserThunk = createAsyncThunk("auth/getCurrentUser", async () => {
    const res = await authApi.getCurrentUser()
    return res
})

export const authSlice = createSlice({
    name: "auth",
    initialState:{
        currentUser: null,
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers: builder => 
        builder

    //register
    .addCase(registerThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.loading = false
        state.error = null
    })
    .addCase(registerThunk.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(registerThunk.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
    })

    // login
    .addCase(loginThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.loading = false
        state.error = null
    })
    .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
    })

    //logout
    .addCase(logoutThunk.fulfilled, (state, action) => {
        state.currentUser = null
        state.loading = false
        state.error = null
    })
    .addCase(logoutThunk.pending, (state, action) => {
        state.loading = true
        state.error = null
    })
    .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
    })

    //get current user
    .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.loading = false
        state.error = null
    })
    .addCase(getCurrentUserThunk.pending, (state, action) => {
        state.loading = true
        state.error = null
    })
    .addCase(getCurrentUserThunk.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
    })
})

export default authSlice.reducer