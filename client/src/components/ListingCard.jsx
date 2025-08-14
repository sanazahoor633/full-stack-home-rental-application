import React, { useState } from "react";
import "../styles/listcard.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
}) => {
  const navigate = useNavigate();
  const [currentIndex, setcurrentIndex] = useState(0);
  const goToPrevSlide = () => {
    setcurrentIndex(
      (prevIndex) =>
        prevIndex - 1 + (listingPhotoPaths.length % listingPhotoPaths.length)
    );
  };

  const goToNextSlide = () => {
    setcurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  return (
    <div
      className="listing-card hover:shadow-2xl hover:shadow-black "
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slide"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div className="slide" key={index}>
              <img
                src={`http://localhost:3030/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div className="prev-button" onClick={(e) => goToPrevSlide(e)}>
                <FaArrowLeft />
              </div>
              <div className="next-button" onClick={(e) => goToNextSlide(e)}>
                <FaArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3>
        {" "}
        {city}, {province}, {country}{" "}
      </h3>
      <p>{category}</p>
      <p>
        <span>${price}</span> per night
      </p>
    </div>
  );
};

export default ListingCard;
