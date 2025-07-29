import React, { useState } from 'react'
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../redux/state';
import TripModel from './TripModel';
const NavBar = () => {
  const [dropdownMenu, setdropdownMenu] = useState(false);
  const user = useSelector(state => state.user);
   const dispatch = useDispatch();

  return (
    <div className='w-full flex items-center justify-between p-4 md:px-12 border-b border-gray-300 ' >
      <div className="icon h-20 ">
        <img className='h-full' src="https://images.unsplash.com/photo-1567607703202-0bf728b59e09?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>
      <div className="search flex items-center justify-between border-1 border-gray-400 rounded-full w-1/4  p-2 px-4 opacity-0 md:opacity-100">
        <input className='text-1xl outline-none w-full p-2' type="text" placeholder='search everything'/>
       <  FaSearch className='text-2xl text-orange-500 ' />
      </div>



      <div className="right flex items-center gap-2">
{user ? (<Link to='/create-listing' className='md:text-[20px] font-semibold tracking-tight' >Become a host </Link>) : (<Link to='/login' className='md:text-[20px] font-semibold tracking-tight' >Become a host </Link>) }

<button onClick={()=> setdropdownMenu(!dropdownMenu)} className='flex items-center border-2 border-gray-400 rounded-3xl justify-center gap-5 h-14 px-2'>
< CiMenuBurger className='text-black font-semibold text-2xl' />
{ !user ? ( < MdPerson className='text-black font-semibold text-4xl' /> ): (<img className='h-12 w-12 rounded-full overflow-hidden ' src={`http://localhost:3030/${user. profileImagePath.replace("public", "")}`} alt="profile picture" />)  }
</button>


{dropdownMenu && !user && ( <div className="nav-right flex flex-col gap-3 absolute top-[14%] right-[5%] bg-white shadow shadow-black p-4 md:w-1/5 rounded-xl text-[18px] font-semibold ">
  <Link to='/login' >Login</Link>
    <Link to='/rgister' >Signup</Link>
</div> )}

<div className=''>
{dropdownMenu && user && ( <TripModel/>) }
</div>


      </div>
    </div>
  )
}
 
export default NavBar
