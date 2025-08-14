import React, { useState } from "react";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/state";
import TripModel from "./TripModel";
import { IoHome } from "react-icons/io5";
const NavBar = () => {
  const [dropdownMenu, setdropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="w-full flex items-center justify-between p-4 md:px-12 border-b border-gray-300 ">
      <div className="icon">
        <IoHome className="text-5xl" />
      </div>
      <div className="search flex items-center justify-between border-1 border-gray-400 rounded-full w-1/4  p-2 px-4 opacity-0 md:opacity-100">
        <input
          className="text-1xl outline-none w-full p-2"
          type="text"
          placeholder="search everything"
        />
        <FaSearch className="text-2xl text-orange-500 " />
      </div>

      <div className="right flex items-center gap-2">
        {user ? (
          <Link
            to="/create-listing"
            className="md:text-[20px] font-semibold tracking-tight"
          >
            Become a host{" "}
          </Link>
        ) : (
          <Link
            to="/login"
            className="md:text-[20px] font-semibold tracking-tight"
          >
            Become a host{" "}
          </Link>
        )}

        <button
          onClick={() => setdropdownMenu(!dropdownMenu)}
          className="flex items-center border-2 border-gray-400 rounded-xl justify-center gap-5 h-16 px-2 py-1"
        >
          <CiMenuBurger className="text-black font-semibold text-4xl" />
          {!user || !user.profileImagePath ? (
            <MdPerson className="text-black font-semibold text-4xl" />
          ) : (
            <img
              className="h-full w-full object-cover object-center rounded-full overflow-hidden "
              src={`http://localhost:3030//${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile picture"
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="nav-right flex flex-col gap-3 absolute top-[14%] right-[5%] bg-white shadow shadow-black p-4 md:w-1/5 rounded-xl text-[18px] font-semibold ">
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </div>
        )}

        <div className="">{dropdownMenu && user && <TripModel />}</div>
      </div>
    </div>
  );
};

export default NavBar;
