import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/NavBar";
import baseUrl from "../apiFolder/api";
import { useEffect } from "react";
import { setPropertyList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Loading from "../components/Loading";

const PropertyList = () => {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
   const propertyList = user?.propertyList

  const getPropertyList = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/${user._id}/properties`, {
        method: "GET",
      });
      const data = await response.json();
      dispatch(setPropertyList(data));
      console.log(data);
      setloading(false)
    
      
    } catch (err) {
      console.log("fetch all properties failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return loading ? <Loading/> :   (
    <>
  <NavBar/>
      <h1 className="title-list px-[50px] py-[40px] md:text-4xl font-semibold capitalize tracking-tight font-mono">
        Your Property List
      </h1>
      <div className="list flex justify-center items-center flex-wrap gap-10 pb-[100px]">
        {propertyList.map(
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
            creator,
          }) => (
            <ListingCard
              listingId={_id}
              listingPhotoPaths={listingPhotoPaths}
              country={country}
              city={city}
              province={province}
              price={price}
              category={category}
              type={type}
              booking={booking}
              creator={creator}
            />
          )
        )}
      </div>
    </>
  );
};
export default PropertyList;
