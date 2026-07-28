import { useEffect } from 'react'
import './App.css'
import Router from './router/Router'
import { useDispatch } from 'react-redux'
import Toast from './components/toast/Toast'
import { getCurrentUserThunk } from './redux/reducers/authSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCurrentUserThunk())
  }, [])

  return (
    <>
      <Router />
      <Toast/>
    </>
  )
}

export default App
