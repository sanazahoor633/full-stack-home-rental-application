import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loading from "../components/Loading";
import { facilities } from "../data";
import NavBar from '../components/NavBar'
// import { BiLoader } from "react-icons/bi";

const ListingDetail = () => {
  const [loading, setloading] = useState(true);
  const { listingId } = useParams();
  const [listing, setlisting] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const deta = await response.json();
      console.log(deta);
      
      setloading(false);
      setlisting(deta);
      console.log(deta);
    } catch (err) {
      console.log("Fetch lising detail failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  // date range FUNctionality
  const [dateRange, setdateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDateRange = (ranges) => {
    //update the date range when user create date
    setdateRange([ranges.selection]);
  };
  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);

  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24)); //calculate the difference in day unit

  return (
    <>
    <NavBar/>
      {loading ? (
        <Loading />
      ) : (
        <div className="listing-details p-8">
          <div className="title">
            <h1 className="text-6xl my-4 font-semibold tracking-tight capitalize ">{listing.title} this is a title</h1>
            <div></div>
          </div>

          <div className="photos h-full flex flex-wrap gap-10 justify-center  ">
            {listing.listingPhotoPaths?.map((item, index) => (
              <div className="h-[50%] ">
              <img
                key={index}
                className="h-full w-full object-center object-cover "
                src={`http://localhost:3030/${item.replace("public", "")}`}
                alt="listing photos"
              />
              </div>
            ))}
          </div>
          <h2>
            {listing.type} in {listing.city}, {listing.province}{" "}
            {listing.country}{" "}
          </h2>
          <p>
            {" "}
            {listing.guestCount} guest - {listing.bedroomsCount} bedroom(s) -{" "}
            {listing.bedCount} bed(s) - {listing.bathrooms} bath(s){" "}
          </p>

          <hr />
          <div className="profile w-10 h-10">
            <img
              className="h-full w-full object-center object-cover "
              src={`http://localhost:3030/${listing.creator.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt=""
            />
            <h3>
              Hosted by {listing.creator.firstname}, {listing.creator.lastName}{" "}
            </h3>
          </div>
          <hr />

          <h3>Description</h3>
          <p>{listing.description}</p>
          <hr />

          <h3>{listing.highlight}</h3>
          <p>{listing.highlightDescs}</p>

          <hr />

          <div className="booking">
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <h1>How long do you want to stay?</h1>
          <div className="date-range-calender">
            <DateRange ranges={dateRange} onChange={handleDateRange} />
            {dayCount > 1 ? (
              <h2>
                ${listing.price} x {dayCount} nights{" "}
              </h2>
            ) : (
              <h2>
                ${listing.price} x {dayCount} night{" "}
              </h2>
            )}

            <h2>Total price: {listing.price * dayCount} </h2>
            <p>Start date: {dateRange[0].startDate.toString()} </p>
            <p>End date: {dateRange[0].endDate.toString()} </p>

            <button className="button" type="submit"></button>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingDetail;
