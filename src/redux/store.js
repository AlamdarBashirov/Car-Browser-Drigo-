import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./reducers/authSlice";
import  carsSlice  from "./reducers/carsSlice";
import  bookingSlice  from "./reducers/bookingSlice";
import  toastSlice  from "./reducers/toastSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice,
        cars: carsSlice,
        bookings: bookingSlice,
        toast: toastSlice
    }
})