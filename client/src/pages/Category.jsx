import React from 'react'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setListings } from '../redux/state'
import { useEffect } from 'react'
import { useState } from 'react'
import ListingCard from '../components/ListingCard'

const Category = () => {
    const [loading, setloading] = useState(true);
 const dispatch = useDispatch();
const {category} = useParams()
    //code from listing
      const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(`http://localhost:3030/properties?category=${category}`
        ,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // console.log(data);
     
      
      dispatch(setListings({ listings: data }));
      setloading(false);
    } catch (err) {
      console.log("fetch listing failed", err.message);
    }
  };


  useEffect(() => {
    getFeedListings(category)
  }, [category])
  return loading ? <Loading/> : (
    <>
      <NavBar/>
       <h1 className="title-list p-[40px] md:text-4xl text-4xl font-semibold capitalize tracking-tight font-mono">
        {category} Listings
      </h1>
      <div   className="list flex justify-center items-center flex-wrap gap-10 pb-[100px]" >
        {listings.map(
          ({
            _id,
            listingPhotoPaths,
            country,
            city,
            province,
            category,
            type,
            price,
            booking = false,
            creator
          }) => (
            <ListingCard key={_id} listingId={_id} listingPhotoPaths={listingPhotoPaths} country={country} city={city} province={province} price={price} category={category} type={type} booking={booking} creator={creator} />
          )
        )}
      </div>
    </>
  )
}

export default Category