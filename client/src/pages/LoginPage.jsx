import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
 import { ToastContainer, toast } from 'react-toastify';
import { setLogin } from "../redux/state";

const LoginPage = () => {
  const navigate = useNavigate()
   const dispatch = useDispatch()
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');


  const [errors, seterrors] = useState(false);


  console.log(email, password);
  const onSubmitHandler = async (e) => {
    e.preventDefault();


// if(password === '' || email === ''){
//   seterrors(true)
// } 
// else {
//   seterrors(false)
// }



    try {
      const response = await fetch("http://localhost:3030/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
      })
let loggedIn = await response.json();
console.log(loggedIn);

if(loggedIn){
  dispatch(
    setLogin({
      user: loggedIn.user,
      token: loggedIn.token
    })
  )
navigate('/');
toast.info('login sucessfull')

}
    } catch (err) {
      console.log('login not sucessfull ', err);
    }
  };
  return (
    <div className="div w-full md:h-screen sm:h-screen bg-gray-700 flex justify-center items-center p-4">
<ToastContainer />


      <div className="container h-fit lg:w-[40%] md:w-[80%]  bg-black/70 px-10 py-10 text-white rounded-2xl hover:scale-105 transition-transform transform duration-300 hover:bg-black ">
        <form onSubmit={onSubmitHandler} action="" className="my-4">
          <input
            type="email"
            className="p-2 border-b-1 border-gray-700 mt-4 mb-0  w-full outline-none text-white "
            placeholder="Email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
{/* {errors ? <p className="text-red-700" >email required</p> : '' } */}
          <input
            type="password"
            className="p-2 border-b-1 border-gray-700 mt-4 mb-0  w-full outline-none text-white "
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

{/* {errors ? <p className="text-red-700">password required</p> : '' } */}


          <div className="flex justify-center items-center my-6 w-full">
            <button className=" font-mono bg-green-900 rounded-2xl w-1/2 p-2 text-center text-[20px] md:text-3xl hover:scale-95 active:scale-100 transition-active duration-300">
              Login
            </button>
          </div>
        </form>
        <Link to="/register" className="my-6">
          <p className="text-1xl whitespace-nowrap">
            Dont't have an account{" "}
            <span className="text-blue-700">Sign up</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
