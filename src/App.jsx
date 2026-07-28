import { useEffect } from 'react'
import './App.css'
import Router from './router/Router'
import { useDispatch } from 'react-redux'
import { getCurrentUserThunk } from './redux/reducers/AuthSlice'

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
