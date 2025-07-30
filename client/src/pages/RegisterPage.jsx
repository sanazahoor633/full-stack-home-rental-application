import React, { useState } from "react";
 import { toast } from 'react-toastify';
import { FaArrowUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [errors, seterrors] = useState({});
  const [loading, setloading] = useState(false)
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    profileImage: null,
  });

  const handleOnchange = (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      setformData({ ...formData, [name]: files[0] });
    } else {
      setformData({ ...formData, [name]: value });
    }
  };

  console.log(formData);

  const submitHandler = async (e) => {
    e.preventDefault();
    setloading(true)
    let newErrors = {};
    let specialCharactor = /[!@#$%^&*(),.?":{}|<>_\-\\[\]\/+=~`]/;
    let capitalized = /[A-Z]/;
    //form authentication
    formData.password !== formData.confirmpassword
      ? (newErrors.confirmpassword = "Password do not match")
      : null;
    formData.email === "" ? (newErrors.email = "email required") : null;
    formData.firstname === ""
      ? (newErrors.firstname = "firstname required")
      : null;
    formData.lastname === ""
      ? (newErrors.lastname = "lastname required")
      : null;
    formData.password === ""
      ? (newErrors.password = "password Required")
      : null;
    formData.confirmpassword === ""
      ? (newErrors.confirmpassword = "confirm password Required")
      : null;
    formData.password.length < 8
      ? (newErrors.password = "password must be greater then 8")
      : null;
    !specialCharactor.test(formData.password)
      ? (newErrors.password =
          "Password must contain at least one special character. ")
      : null;
    !capitalized.test(formData.password)
      ? (newErrors.password =
          "Password must contain at least one capital alpha. ")
      : null;
    seterrors(newErrors);
    //end form authentication

    try {
      const register_form = new FormData();

      for (var key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3030/auth/register", {
        method: "POST",
        body: register_form,
      });

      if (response.ok) {
        console.log(response.message);
        setloading(false)
        toast.success('Signup sucessfull')
        navigate("/login");
      } else {
        console.log(`registerration failed error ${response.message} `);
        setloading(false)
        
      }
    } catch (err) {
      console.log("registered failed", err.message);
      setloading(false)
    }
  };

  return (
    <div>
      <div className="div w-full md:h-screen sm:h-screen bg-gray-700 flex justify-center items-center p-4">
        <div className="container h-fit lg:w-[40%] md:w-[90%]  bg-black/70 px-10 py-5 text-white rounded-2xl hover:scale-105 transition-transform transform duration-300 hover:bg-black ">
          <form action="" className="" onSubmit={submitHandler}>
            <h3 className="text-center text-4xl tracking-tighter font-semibold font-mono">
              Register
            </h3>
            <input
              type="text"
              className="p-2 border-b-1 border-gray-700 mt-4 mb-0 w-full outline-none text-white "
              placeholder="FirstName"
              id="firstname"
              name="firstname"
              onChange={handleOnchange}
            />

            {errors.firstname && (
              <p className="text-red-500">{errors.firstname}</p>
            )}

            <input
              type="text"
              className="p-2 border-b-1 border-gray-700 mt-4 mb-0 w-full outline-none text-white "
              placeholder="LastName"
              id="lastname"
              name="lastname"
              onChange={handleOnchange}
            />

            {errors.lastname && (
              <p className="text-red-500">{errors.lastname}</p>
            )}
            <input
              type="email"
              className="p-2 border-b-1 border-gray-700 mt-4 mb-0  w-full outline-none text-white "
              placeholder="Email"
              id="email"
              name="email"
              onChange={handleOnchange}
            />

            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <input
              type="password"
              className="p-2 border-b-1 border-gray-700 mt-4 mb-0 w-full outline-none text-white "
              placeholder="Password"
              name="password"
              id="password"
              onChange={handleOnchange}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <input
              type="password"
              className="p-2 border-b-1 border-gray-700  mt-4 mb-0 w-full outline-none text-white "
              placeholder="Confirm Password"
              name="confirmpassword"
              id="confirmpassword"
              onChange={handleOnchange}
            />
            {errors.confirmpassword && (
              <p className="text-red-500">{errors.confirmpassword}</p>
            )}

            <input
              type="file"
              className="p-2 border-b-1 border-gray-700   mt-4 mb-0 w-full outline-none text-white "
              accept="image/*"
              id="profileImage"
              name="profileImage"
              onChange={handleOnchange}
            />

            <label
              htmlFor="profileImage"
              className="flex flex-col items-center gap-2 mt-3"
            >
              <FaArrowUp className="text-3xl" />
              <p>Upload Profile Photo</p>
            </label>

            {formData.profileImage && (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="profile photo"
                className="w-25 h-25 object-cover rounded-full mt-4 mx-auto"
              />
            )}

            <div className="flex justify-center items-center my-6 w-full">
              <button disabled={loading} className=" font-mono bg-blue-900 rounded-2xl w-1/2 p-2 text-center text-[20px] md:text-3xl hover:scale-95 active:scale-100 transition-active duration-300 disabled:bg-blue-600">
                {loading ? 'Register...' : 'Register' }
              </button>
            </div>
          </form>
          <Link to="/login">
            <p className="text-1xl whitespace-nowrap">
              Already have an account{" "}
              <span className="text-blue-700">Login here</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
