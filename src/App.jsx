import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Router from './router/Router'

import {register, login, logout, getCurrentUser} from './api/authApi'

function App() {

  return (
    <>
      <Router />
    </>
  )
}

export default App
