import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from "../apiFolder/api";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import NavBar from "../components/NavBar";
// import '../styles/list.css'

const TripList = () => {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);

  const getTripList = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/${userId}/trips`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      dispatch(setTripList(data));
      setloading(false);
      
    } catch (err) {
      console.log("Fetch trip list field", err.message);
    }
  };

  useEffect(() => {
    getTripList()
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <>
    <NavBar/>
      <h1 className="title-list px-[50px] py-[40px] md:text-4xl font-semibold capitalize tracking-tight font-mono">Your Trip List</h1>
      <div className=" list flex justify-center items-center flex-wrap gap-10 pb-[100px] ">
        {tripList?.map(({listingId, startDate, endDate, totalPrice, hostId, booking=true }) => (
          <ListingCard 
            listingId={listingId._id}
            listingPhotoPaths={listingId.listingPhotoPaths}
            city={listingId.city}
            province={listingId.province}
            country={listingId.country}
            category={listingId.category}
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            booking={booking}
            creator={hostId._id}

          />
        ))}
      </div>
    </>
  );
};

export default TripList;
