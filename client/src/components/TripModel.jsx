import React from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/state";
import { Link } from "react-router-dom";

const TripModel = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="nav-right flex flex-col gap-4 absolute top-[14%] right-[5%] bg-white shadow shadow-black p-4 md:w-1/6 rounded-xl text-[18px] font-semibold  ">
        <Link className="hover:bg-gray-200 hover:text-red-500 px-8" to="">
          {" "}
          Trip List{" "}
        </Link>
        <Link className="hover:bg-gray-200 hover:text-red-500 px-8" to="">
          {" "}
          Wish List{" "}
        </Link>
        <Link className="hover:bg-gray-200 hover:text-red-500 px-8" to="">
          {" "}
          Property List{" "}
        </Link>
        <Link className="hover:bg-gray-200 hover:text-red-500 px-8" to="">
          {" "}
          Reservation List{" "}
        </Link>
        <Link className="hover:bg-gray-200 hover:text-red-500 px-8" to="">
          {" "}
          Become a host{" "}
        </Link>
        <Link
          className="hover:bg-gray-200 hover:text-red-500 px-8"
          to="/login"
          onClick={() => dispatch(setLogout())}
        >
          {" "}
          Logout{" "}
        </Link>
      </div>
    </div>
  );
};

export default TripModel;
