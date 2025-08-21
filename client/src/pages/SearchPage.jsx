import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import baseUrl from '../apiFolder/api';
import { setListings } from '../redux/state';
import Loading from '../components/Loading';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import ListingCard from '../components/ListingCard';

const SearchPage = () => {
  const [loading, setloading] = useState(true)
  const {search} = useParams();
  const dispatch = useDispatch()
  const listings = useSelector((state) => state.listings);
const getSearchListings = async () => {
  try{
    const response = await fetch(`${baseUrl}/properties/search/${search}`, {
      method: 'GET'
    })
    const data = await response.json();
    // console.log('data from search',  data);
    
    // dispatch(setListings({ listings: data }));
    // dispatch(setListings({ listings: data }))
    dispatch(setListings({ listings: data.listings }));
   
    setloading(false);
  } catch(err){
console.log('feching search list failed', err.message);

  }
};


useEffect(() => {
getSearchListings()
}, [search])

   return loading ? <Loading/> : (
    <>
      <NavBar />
      <h1 className="title-list p-[40px] md:text-4xl text-4xl font-semibold capitalize tracking-tight font-mono">
        {search}
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
  );
}

export default SearchPage