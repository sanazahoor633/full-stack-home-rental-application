import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from "../apiFolder/api";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import NavBar from "../components/NavBar";
// import '../styles/list.css'

const ReservationList = () => {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?._id);
  const reservationList = useSelector((state) => state.user.reservationList);

  const getReservationList = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/${userId}/reservations`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      dispatch(setReservationList(data));
      setloading(false);
      console.log(data);
      
    } catch (err) {
      console.log("Fetch reservation field", err.message);
    }
  };

  useEffect(() => {
   
  getReservationList()
    
  
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <>
    <NavBar/>
      <h1 className="title-list px-[50px] py-[40px] md:text-4xl font-semibold capitalize tracking-tight font-mono">Your Reservation List</h1>
      <div className=" list flex justify-center items-center flex-wrap gap-10 pb-[100px] ">
        {reservationList?.map(({ _id, listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
          <ListingCard 
          key={_id}
            listingId={listingId?._id}
            creator={hostId?._id}
            listingPhotoPaths={listingId.listingPhotoPaths}
            city={listingId.city}
            province={listingId.province}
            country={listingId.country}
            category={listingId.category}
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            booking={booking}

          />
        ))}
      </div>
    </>
  );
};

export default ReservationList;
