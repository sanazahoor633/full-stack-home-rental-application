import React, { useState } from 'react'
import RegisterPage from './pages/RegisterPage'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
  import { ToastContainer } from 'react-toastify';
import CreateListing from './pages/CreateListing'



const App = () => {
  return (
    <div className='App'>
<ToastContainer/>
<Routes>
<Route path='/' element={<Homepage />} />
<Route path='/register' element={<RegisterPage />} />
<Route path='/login' element={<LoginPage />} />
<Route path='/create-listing' element={<CreateListing />} />

</Routes>

    </div>
  )
}

export default App




