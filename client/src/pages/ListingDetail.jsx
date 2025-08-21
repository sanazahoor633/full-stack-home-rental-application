import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ListingDetail.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loading from "../components/Loading";
import { facilities } from "../data";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import baseUrl from "../apiFolder/api";
// import { BiLoader } from "react-icons/bi";

const ListingDetail = () => {
  const navigate = useNavigate();
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
  }, [listingId]);

  const [dateRange, setdateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDateRange = (ranges) => {
    setdateRange([ranges.selection]);
  };
  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
   let dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

  // submit booking

  const customerId = useSelector((state) => state.user?._id);

  const submitHandler = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toString(),
        endDate: dateRange[0].endDate.toString(),
        totalPrice: listing.price * dayCount,
      };

      // fetching data

      const response = await fetch(`${baseUrl}/bookings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      const data = await response.json();
      
      if (response.ok) {
        navigate(`/${customerId}/trips`);
        toast.success("successfull");
        return;
      }
    } catch (err) {
      console.log("bookigs failed", err.message);
    }
  };

  return (
    <>
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="listing-details md:p-[100px] p-10 ">
          <div className="title">
            <h1 className="text-3xl tracking-tight font-mono font-bold ">
              {listing.title}
            </h1>
            <div></div>
          </div>

          <div className="photos">
            {listing.listingPhotoPaths?.map((item, index) => (
              <div key={index} className=" ">
                <img
                  key={index}
                  className="detail-photos h-full w-full object-center object-cover "
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
            {listing.guestCount} guest - {listing.bedroomsCount} bedrooms -{" "}
            {listing.bedCount} beds - {listing.bathrooms} baths
          </p>

          <hr />
          <div className="profile rounded-full ">
            <div className="w-20 h-20">
              <img
                className="w-full h-full object-center object-cover rounded-md"
                src={`http://localhost:3030/${listing?.creator?.profileImagePath.replace(
                  "public",
                  ""
                )}`}
                alt=""
              />
            </div>
            <h3>
              Hosted by {listing.creator.firstname}, {listing.creator.lastName}{" "}
            </h3>
          </div>
          <hr />

          <h3 className="text-2xl tracking-tight font-mono ">Description</h3>
          <p className="text-1xl text-gray-700">{listing.description}</p>
          <hr />

          <h3 className="text-2xl tracking-tight font-mono ">Highlights</h3>
          <p className="text-1xl text-gray-700">{listing.highlightDesc}</p>

          <hr />
          <h2 className="text-2xl tracking-tight font-mono ">
            What this place offers?
          </h2>
          <div className="booking">
            <div className="amenities">
              {listing.amenities?.[0]?.split(",").map((item, index) => (
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

          <h1 className="font-semibold mb-4">How long do you want to stay?</h1>
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

            <h2>
              {" "}
              <span className="font-semibold ">Total price:</span>{" "}
              {listing.price * dayCount}{" "}
            </h2>
            <p>
              <span className="font-semibold ">Start date:</span>{" "}
              {dateRange[0].startDate.toString()}{" "}
            </p>
            <p>
              <span className="font-semibold ">End date:</span>{" "}
              {dateRange[0].endDate.toString()}{" "}
            </p>

            <div className="text-center">
              <button
                className=" p-4 text-3xl bg-red-900 hover:bg-blue-700 active:scale-95 transition-all duration-300 hover:shadow hover:shadow-black text-white w-fit rounded-lg "
                type="submit"
                onClick={submitHandler}
              >
                Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingDetail;

// https://github.com/phuc-mai/dream_nest
