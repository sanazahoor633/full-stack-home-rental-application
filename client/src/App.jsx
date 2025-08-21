import React, { useState } from 'react'
import RegisterPage from './pages/RegisterPage'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
  import { ToastContainer } from 'react-toastify';
import CreateListing from './pages/CreateListing'
import ListingDetail from './pages/ListingDetail'
import TripList from './pages/TripList'
import WishList from './pages/WishList'
import PropertyList from './pages/PropertyList'
import ReservationList from './pages/ReservationList'
import Category from './pages/Category'
import SearchPage from './pages/SearchPage'



const App = () => {
  return (
    <div className='App'>
<ToastContainer/>
<Routes>
<Route path='/' element={<Homepage />} />
<Route path='/register' element={<RegisterPage />} />
<Route path='/login' element={<LoginPage />} />
<Route path='/create-listing' element={<CreateListing />} />
<Route path='/properties/:listingId' element={<ListingDetail />} />
<Route path='/properties/category/:category' element={<Category />} />
<Route path='/properties/search/:search' element={< SearchPage />} />
<Route path='/:userId/trips' element={<TripList/>} />
<Route path='/:userId/wishList' element={< WishList />} />
<Route path='/:userId/properties' element={< PropertyList />} />
<Route path='/:userId/reservations' element={< ReservationList />} />

{/* <Route path='/users/:userId/trips' element={<TripList/>} /> */}
</Routes>

    </div>
  )
}

export default App




