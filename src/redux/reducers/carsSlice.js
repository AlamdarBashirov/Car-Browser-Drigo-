import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import carsApi from '../../api/carsApi'

export const getCarsThunk = createAsyncThunk("cars/getAll", async (query) => {
    const res = await carsApi.getCars(query)
    return res
})

export const getCarByIdThunk = createAsyncThunk("cars/getById", async (id) => {
    const res = await carsApi.getCar(id)
    return res
})

export const carsSlice = createSlice({
    name: "cars",
    initialState: {
        cars: [],
        totalCount: 0,
        selectedCar: null,
        loading: false,
        error: null,
        latestRequestId: null
    },
    reducers: {},

    extraReducers: builder =>
        builder

            //get all cars
            .addCase(getCarsThunk.fulfilled, (state, action) => {
                if (state.latestRequestId !== action.meta.requestId) {
                    console.log("IGNORED");

                    return;
                } else {
                    console.log(state.cars)
                    state.cars = action.payload.cars
                    state.totalCount = action.payload.totalCount
                    state.loading = false
                    state.error = null
                    console.log(
                        "fulfilled:",
                        action.meta.requestId,
                        state.latestRequestId
                      );
                }
            })
            .addCase(getCarsThunk.pending, (state, action) => {
                state.loading = true
                state.error = null
                state.latestRequestId = action.meta.requestId
                // console.log(action)
            })
            .addCase(getCarsThunk.rejected, (state, action) => {
                if (state.latestRequestId !== action.meta.requestId) {
                    return;
                }else{
                    state.error = action.error.message
                    state.loading = false
                }

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