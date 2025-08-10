import React from 'react'
import NavBar from '../components/NavBar'
import Slide from '../components/Slide'
import Categories from '../components/Categories'
import Listings from '../components/Listings'

const Homepage = () => {
  return (
    <>
    <NavBar/>
    <Slide/>
    <Categories/>
    <Listings/>
    </>
  )
}

export default Homepage