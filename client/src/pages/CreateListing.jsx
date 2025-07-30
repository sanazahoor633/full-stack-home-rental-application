import React from "react";
import NavBar from "../components/NavBar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { categories, facilities, types } from "../data";

const CreateListing = () => {
  return (
    <>
      <NavBar />
      <div className="creating-listing bg-gray-200 py-4 flex flex-col gap-6 px-10">
        <h1 className="text-4xl font-bold ">Publish your place</h1>
        <form className="bg-white p-6 my-10">
            <div className="create-Listing-step-1 my-8">
          <h3 className="text-3xl  text-red-500 my-4 font-extrabold">
            Step 1: Tell us about your place
          </h3>
          <hr />
          <h3 className="mt-[50px] text-3xl font-bold">
            Which of these categories best describe your place
          </h3>

          <div className="categories-boxes my-4  flex flex-wrap justify-center items-center gap-6 ">
            {categories.map((item, index) => (
              <div
                key={index}
                className="text border-2 border-gray-500 h-[200px] w-[280px] flex flex-col items-center gap-2 justify-center rounded-lg hover:bg-black hover:text-white active:scale-95 transition-all duration-200 ease-in-out"
              >
                <div className="icon text-3xl ">{item.icon}</div>
                <div className="text text-3xl ">{item.label}</div>
              </div>
            ))}

            {/* <div className="text border-2 border-gray-500 h-[200px] w-[280px] bg-red-400  flex flex-col items-center gap-2 justify-center rounded-lg">
    <div className="icon text-3xl font-bold">iconn</div>
    <div className="text text-3xl font-bold">label</div>
</div> */}
          </div>

          <h3 className="mt-[80px] text-3xl font-bold">
            What type of place will guests have?
          </h3>
          <div className="categories-types w-full my-4 flex flex-col gap-6">
            {types?.map((item, index) => (
              <div
                key={index}
                className="categories-type border flex justify-between items-center md:w-[80%] p-6 rounded-lg"
              >
                <div className="text ">
                  <div className="name text-3xl font-mono">{item.name}</div>
                  <p className="description text-2xl tracking-tighter font-mono">
                    {item.description}
                  </p>
                </div>

                <div className="icon text-4xl font-extrabold">{item.icon}</div>
              </div>
            ))}
          </div>

          <h3 className="mt-[50px] text-3xl font-bold">
            Where's your place located?
          </h3>
          <div className="full w-full mb-7">
            <div className="loction my-4 w-[80%]">
              <p className="street text-2xl tracking-tight font-mono">
                Street adress
              </p>
              <input
                className="border-1 border-gray-500 w-full p-4 text-2xl rounded-md outline-none"
                type="text"
                placeholder="street"
                name="street"
              />
            </div>
          </div>
          <div className="half flex flex-wrap gap-8 w-full items-center">
            <div className="location md:w-[45%] w-full">
              <p className="apt text-2xl tracking-tight font-mono">
                Apartement.. Suite, etc (if applicable){" "}
              </p>
              <input
                className="border-1 border-gray-500 w-full p-4 text-2xl rounded-md outline-none"
                type="text"
                placeholder="Apt.. Suite, etc (if applicable)"
                name="aptSuite"
              />
            </div>
            <div className="location md:w-[45%] w-full">
              <p className="city text-2xl tracking-tight font-mono">City</p>
              <input
                className="border-1 border-gray-500 w-full p-4 text-2xl rounded-md outline-none"
                type="text"
                placeholder="City"
                name="city"
              />
            </div>

            <div className="location md:w-[45%] w-full">
              <p className="province text-2xl tracking-tight font-mono">
                Province
              </p>
              <input
                className="border-1 border-gray-500 w-full p-4 text-2xl rounded-md outline-none"
                type="text"
                placeholder="Province"
                name="province"
              />
            </div>

            <div className="location md:w-[45%] w-full">
              <p className="country text-2xl tracking-tight font-mono">
                Country
              </p>
              <input
                className="border-1 border-gray-500 w-full p-4 text-2xl rounded-md outline-none"
                type="text"
                placeholder="Country"
                name="country"
              />
            </div>
          </div>



  <h3 className="mt-[50px] text-3xl font-bold">
            Share some basics about your place
          </h3>
          <div className="basics my-4  flex flex-wrap gap-10">
            <div className="basic border-1 border-gray-500 w-[280px] flex items-center  gap-6 p-4 rounded-lg">
                <p className="text-2xl">Guest</p>
                <div className="basic-count flex items-center gap-4">
<IoIosAddCircleOutline className="text-3xl font-bold cursor-pointer text-black " />
<p className="text-2xl">1</p>
                    < IoIosRemoveCircleOutline className="text-3xl font-bold cursor-pointer text-black " />
                </div>
            </div>

              <div className="basic border-1 border-gray-500 w-[280px] flex items-center  gap-6 p-4 rounded-lg">
                <p className="text-2xl">Bedrooms</p>
                <div className="basic-count flex items-center gap-4">
<IoIosAddCircleOutline className="text-3xl font-bold cursor-pointer text-black " />
<p className="text-2xl">1</p>
                    < IoIosRemoveCircleOutline className="text-3xl font-bold cursor-pointer text-black " />
                </div>
            </div>

              <div className="basic border-1 border-gray-500 w-[280px] flex items-center  gap-6 p-4 rounded-lg">
                <p className="text-2xl">Beds</p>
                <div className="basic-count flex items-center gap-4">
<IoIosAddCircleOutline className="text-3xl font-bold cursor-pointer text-black " />
<p className="text-2xl">1</p>
                    < IoIosRemoveCircleOutline className="text-3xl font-bold cursor-pointer text-black " />
                </div>
            </div>

              <div className="basic border-1 border-gray-500 w-[280px] flex items-center  gap-6 p-4 rounded-lg">
                <p className="text-2xl">Bathrooms</p>
                <div className="basic-count flex items-center gap-4">
<IoIosAddCircleOutline className="text-3xl font-bold cursor-pointer text-black " />
<p className="text-2xl">1</p>
                    < IoIosRemoveCircleOutline className="text-3xl font-bold cursor-pointer text-black " />
                </div>
            </div>
          </div>



          </div>


          <div className="create-listing-step-2 my-8">
              <h3 className="text-3xl  text-red-500 my-3 font-extrabold">
            Step 2: Tell us about your place
          </h3>
          <hr />


  <h3 className="mt-[50px] text-3xl font-bold">
           Tell guests what your place has offer
          </h3>



  <div className="categories-boxes my-4  flex flex-wrap justify-center items-center gap-6 ">
            {facilities.map((item, index) => (
              <div
                key={index}
                className="text border-2 border-gray-500 h-[200px] w-[280px] flex flex-col items-center gap-2 justify-center rounded-lg hover:bg-black hover:text-white active:scale-95 transition-all duration-200 ease-in-out"
              >
                <div className="icon text-3xl ">{item.icon}</div>
                <div className="text text-2xl ">{item.name}</div>
              </div>
            ))}

       
          </div>







          </div>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
