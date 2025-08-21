import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import ListingCard from "../components/ListingCard";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);
  return (
    <>
      <NavBar />
      <h1 className="title-list px-[50px] md:text-4xl text-4xl font-semibold capitalize tracking-tight font-mono">
        Your Wish List
      </h1>
      <div   className="list flex justify-center items-center flex-wrap gap-10 pb-[100px]" >
        {wishList.map(
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
            <ListingCard listingId={_id} listingPhotoPaths={listingPhotoPaths} country={country} city={city} province={province} price={price} category={category} type={type} booking={booking} creator={creator} />
          )
        )}
      </div>
    </>
  );
};

export default WishList;
