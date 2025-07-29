import React, { useState } from 'react'
import RegisterPage from './pages/RegisterPage'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/HomePage'
import LoginPage from './pages/LoginPage'



const App = () => {
  return (
    <div>

<Routes>
<Route path='/' element={<Homepage />} />
<Route path='/register' element={<RegisterPage />} />
<Route path='/login' element={<LoginPage />} />

</Routes>

    </div>
  )
}

export default App




