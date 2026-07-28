import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Router from './router/Router'
import { useDispatch } from 'react-redux'
import { getCurrentUserThunk } from './redux/reducers/AuthSlice'

// import { register, login, logout, getCurrentUser } from './api/authApi'
// import { getBookings, createBooking } from './api/bookingsApi'
// import { useDispatch, useSelector } from 'react-redux'
// import { registerThunk } from './redux/reducers/authSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUserThunk())
  }, [])

  return (
    <>
      <Router />
    </>
  )
}

export default App
