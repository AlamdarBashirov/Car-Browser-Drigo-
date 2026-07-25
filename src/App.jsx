import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Router from './router/Router'

import { register, login, logout, getCurrentUser } from './api/authApi'
import { getBookings, createBooking } from './api/bookingsApi'
import { useDispatch, useSelector } from 'react-redux'
import { registerThunk } from './redux/reducers/authSlice'

function App() {

//   const dispatch = useDispatch()
//   const { currentUser, loading, error } = useSelector(
//     state => state.auth
//   );

//   const testRegister = () => {
//     dispatch(
//       registerThunk({
//         name: "Alamdar",
//         email: "alamdartest@gmail.com",
//         password: "123456"
//       })
//     );
//   };

//   console.log("USER:", currentUser);
// console.log("LOADING:", loading);
// console.log("ERROR:", error);

  return (
    <>
      <Router />
      {/* <button onClick={testRegister}>
        Test Register
      </button> */}
    </>
  )
}

export default App
