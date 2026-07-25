import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./reducers/authSlice";
import  carsSlice  from "./reducers/carsSlice";
import  bookingSlice  from "./reducers/bookingSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice,
        cars: carsSlice,
        bookings: bookingSlice
    }
})