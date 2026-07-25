import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import carsApi from '../../api/carsApi'

export const getCarsThunk = createAsyncThunk("cars/getAll", async(query) => {
    const res = await carsApi.getCars(query)
    return res
})

export const getCarByIdThunk = createAsyncThunk("cars/getById", async(id) => {
    const res = await carsApi.getCar(id)
    return res
})

export const carsSlice = createSlice({
    name:"cars",
    initialState:{
        cars:[],
        selectedCar: null,
        loading: false,
        error:null,
    },
    reducers:{},

    extraReducers:builder => 
        builder

    //get all cars
    .addCase(getCarsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.cars = action.payload
        state.error = null
    })
    .addCase(getCarsThunk.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(getCarsThunk.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
    }) 

    //get car by id
    .addCase(getCarByIdThunk.fulfilled, (state, action) => {
        state.loading = false
        state.selectedCar = action.payload
        state.error = null
    })
    .addCase(getCarByIdThunk.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(getCarByIdThunk.rejected, (state, action) => {
        state.selectedCar = null
        state.error = action.error.message
        state.loading = false
    })
})

export default carsSlice.reducer