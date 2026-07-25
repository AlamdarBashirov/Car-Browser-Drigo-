import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./reducers/authSlice";
import  carsSlice  from "./reducers/carsSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice,
        cars: carsSlice
    }
})