import React, { useEffect, useState } from "react";
import { categories } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import Loading from "./Loading";
import ListingCard from "./ListingCard";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [selectedCategory, setselectedCategory] = useState("ALL");
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "ALL"
          ? `http://localhost:3030/properties?category=${selectedCategory}`
          : "http://localhost:3030/properties",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // console.log(data);
      
      // if(!data) return console.log(data.message);
      
      dispatch(setListings({ listings: data }));
      setloading(false);
    } catch (err) {
      console.log("fetch listing failed", err.message);
    }
  };
  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);
  // console.log(listings);

  return (
    <div className="category-list">
      <div className="categories-boxes   my-8 flex flex-wrap justify-center items-center gap-4 ">
        {categories.map((category, index) => (
          <div
            onClick={() => setselectedCategory(category.label)}
            key={index}
            className={`category ${category.label === selectedCategory ? 'selected' : '' }  text shadow shadow-blue-400 h-[100px] w-[180px] flex flex-col items-center gap-2 justify-center rounded-lg  active:scale-95 transition-all duration-200 ease-in-out`}
          >
            <div className="icon text-2xl ">{category.icon}</div>
            <div className={`text text-2xl  `}>{category.label}</div>
          </div>
        ))}
      </div>

      {/* do flex listing card */}
      <div className="flex flex-wrap items-center justify-center gap-4 ">
        {loading ? (
          <Loading />
        ) : (
          listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking= false
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                category={category}
                type={type}
                price={price}
                country={country}
                booking={booking}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Listings;
