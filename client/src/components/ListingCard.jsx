import React, { useState } from "react";
import "../styles/listcard.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import baseUrl from "../apiFolder/api";
import { useSelector, useDispatch } from "react-redux";
import { setwishList } from "../redux/state";
import { FaHeart } from "react-icons/fa";


const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  category,
  type,
  price,
  country,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentIndex, setcurrentIndex] = useState(0);
  const goToPrevSlide = () => {
    setcurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setcurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  // add wishlist
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];
  const isLiked = wishList?.find((item) => item?._id === listingId);
  const patchWishlst = async () => {
    try {
      if(user?._id !== creator._id ){
      const response = await fetch(
        `${baseUrl}/users/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setwishList(data.wishList));
      } else { return }
    } catch (err) {}
  };

  return (
    <div className="listing-card hover:shadow-2xl hover:shadow-black ">
      <div className="slider-container">
        <div
          className="slide"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div className="slide" key={index}>
              <img
                onClick={() => {
                  navigate(`/properties/${listingId}`);
                }}
                src={`http://localhost:3030/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button z-10"
                onClick={(e) => goToPrevSlide(e)}
              >
                <FaArrowLeft />
              </div>
              <div
                className="next-button z-10"
                onClick={(e) => goToNextSlide(e)}
              >
                <FaArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-[15px] tracking-tight">
        {" "}
        {city}, {province}, {country}{" "}
      </h3>
      <p className="font-semibold tracking-tight py-2 ">{category}</p>

      {!booking ? (
        <>
          <p>{type}</p>
          <p>
            <span>${price}</span> per night
          </p>
        </>
      ) : (
        <>
          <div>
            <p className="text-[12px]">
              {" "}
              <span className="font-semibold">Start: </span> {startDate}{" "}
            </p>
            <p className="text-[12px]">
              {" "}
              <span className="font-semibold">End:</span> {endDate}
            </p>
          </div>

          <p>
            <span>${totalPrice}</span> total
          </p>
        </>
      )}

      <button
        className="favorite "
        onClick={(e) => {
          e.stopPropagation();
          patchWishlst();
        }}
        disabled={!user}
      >
        {isLiked ? (
          <FaHeart className="text-red-700 text-4xl active:scale-90 transition-all duration-200 " />
        ) : (
          <FaHeart className="text-white text-4xl active:scale-90 transition-all duration-200 " />
        )}
       
      </button>
    </div>
  );
};

export default ListingCard;
