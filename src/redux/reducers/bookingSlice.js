import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingsApi from '../../api/bookingsApi'

export const getBookingsOfUserThunk = createAsyncThunk("bookings/getAllBookingsOfUser", async (userId) => {
    const res = await bookingsApi.getBookings(userId)
    return res
})

export const getBookingByIdThunk = createAsyncThunk("bookings/getById", async (bookingId) => {
    const res = await bookingsApi.getBookingById(bookingId)
    return res
})

export const createBookingThunk = createAsyncThunk("bookings/createNewBooking", async (bookingData) => {
    const res = await bookingsApi.createBooking(bookingData)
    return res
})

export const cancelBookingThunk = createAsyncThunk("booking/cancelBooking", async (id) => {
    const res = await bookingsApi.cancelBooking(id)
    return res
})

export const bookingSlice = createSlice({
    name: "bookings",
    initialState: {
        bookings: [],
        selectedBooking: null,
        loading: false,
        error: null
    },
    reducers: {
        cancelBookingOptimistic: (state, action) => {
            const booking = state.bookings.find((item) => item.id === action.payload)
            if (booking) {
                booking.status = "cancelled"
            }
            if (state.selectedBooking?.id === action.payload){
                state.selectedBooking.status = "cancelled"
            }
        },
        rollbackCancelledBooking: (state, action) => {
            const booking = state.bookings.find(item => item.id === action.payload);
        
            if (booking) {
                booking.status = "active";
            }
            if (state.selectedBooking?.id === action.payload){
                state.selectedBooking.status = "active"
            }
        }
    },

    extraReducers: builder =>
        builder


            // get bookings of user
            .addCase(getBookingsOfUserThunk.fulfilled, (state, action) => {
                state.loading = false
                state.bookings = action.payload
                state.error = null
            })
            .addCase(getBookingsOfUserThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getBookingsOfUserThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            //get booking by id 
            .addCase(getBookingByIdThunk.fulfilled, (state, action) => {
                state.loading = false
                state.selectedBooking = action.payload
                state.error = null
            })
            .addCase(getBookingByIdThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getBookingByIdThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            //create new booking for user
            .addCase(createBookingThunk.fulfilled, (state, action) => {
                state.loading = false
                state.selectedBooking = action.payload
                state.error = null
                state.bookings  .push(action.payload);
            })
            .addCase(createBookingThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createBookingThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.selectedBooking = null
            })

            //cancel booking 
            .addCase(cancelBookingThunk.fulfilled, (state, action) => {
                state.loading = false
                state.selectedBooking = action.payload
                state.error = null
            })
            .addCase(cancelBookingThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(cancelBookingThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
})

export const {cancelBookingOptimistic, rollbackCancelledBooking} = bookingSlice.actions;
export default bookingSlice.reducer