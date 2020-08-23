import React from 'react'
import { ToastContainer } from 'react-toastify'

import Routes from './routes/Routes'
import { HashRouter } from 'react-router-dom'

import { UserProvider } from '@contexts/User'
import Load, { LoadProvider } from '@contexts/Load'

const App = () => {
  return (
    <UserProvider>
      <LoadProvider>
          <HashRouter>
            <Routes />
          </HashRouter>
          <ToastContainer />
          <Load />
      </LoadProvider>
    </UserProvider>
  )
}

export default App
