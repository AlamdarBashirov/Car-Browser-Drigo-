import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Router from './router/Router'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserThunk } from './redux/reducers/AuthSlice'

function App() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)

  console.log("app", currentUser);
  
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
