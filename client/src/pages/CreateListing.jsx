import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { categories, facilities, types } from "../data";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaImage } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CreateListing = () => {
  // upload drag and drop photos
  const navigate = useNavigate()
  const [category, setcategory] = useState("");
  const [amenities, setamenities] = useState([]);
  const [type, settype] = useState("");
  const [photos, setphotos] = useState([]);
  const [guestCount, setguestCount] = useState(1);
  const [bedroomsCount, setbedroomsCount] = useState(1);
  const [bedCount, setbedCount] = useState(1);
  const [bathrooms, setbathrooms] = useState(1);
  const [formLocation, setformLocation] = useState({
    streetAdress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });
  const [formDescription, setformDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  //location
  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setformLocation({ ...formLocation, [name]: value });
  };

  // console.log(formLocation);

  ///aminities

  const handleSelectAminities = (facilities) => {
    if (amenities.includes(facilities)) {
      setamenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facilities)
      );
    } else {
      setamenities((prev) => [...prev, facilities]);
    }
  };

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setphotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhotos = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setphotos(items);
  };

  const handleRemovePhotos = (indexToRemove) => {
    setphotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  ///// description
  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setformDescription({ ...formDescription, [name]: value });
  };

  const creatorId = useSelector((state) => state.user?._id)

const handlePost = async (e) => {
  e.preventDefault();


  try{
const listingForm = new FormData();
listingForm.append('creator', creatorId)
listingForm.append('category', category)
listingForm.append('type', type)
listingForm.append('streetAdress', formLocation.streetAdress )
listingForm.append('aptSuite', formLocation.aptSuite )
listingForm.append('city', formLocation.city )
listingForm.append('province', formLocation.province )
listingForm.append('country', formLocation.country )
listingForm.append('guestCount', guestCount)
listingForm.append('bedroomsCount', bedroomsCount)
listingForm.append('bedCount', bedCount)
listingForm.append('bathrooms', bathrooms);
listingForm.append('amenities', amenities);
listingForm.append('title', formDescription.title);
listingForm.append('description', formDescription.description);
listingForm.append('highlight', formDescription.highlight);
listingForm.append('highlightDesc', formDescription.highlightDesc);
listingForm.append('price', formDescription.price);

photos.forEach((photo)=> {
  listingForm.append("listingPhotos", photo)
})
/// post request

const response = await fetch('http://localhost:3030/properties/create', {
method: 'POST',
body: listingForm
})
if(response.ok) {
  toast.success('create listing sucessfull')
  navigate('/')

}


  }
  catch(err){
console.log('publish listing failed', err.message);

  }
}



  return (
    <>
      <NavBar />
      <div className="creating-listing bg-gray-200 py-4 flex flex-col gap-6 px-10">
        <h1 className="text-4xl font-bold ">Publish your place</h1>
        <form  onSubmit={handlePost} className="bg-white p-6 my-10 flex flex-col gap-12">

            {/* ///creating ist step1 start */}
          <div className="create-Listing-step-1 my-8">
            <h3 className="text-4xl  text-red-500 my-4 font-extrabold">
              Step 1: Tell us about your place
            </h3>
            <hr />
            <h3 className="mt-[50px] text-3xl font-bold">
              Which of these categories best describe your place
            </h3>
            {/* //categories div start */}
            <div className="categories-boxes my-4  flex flex-wrap justify-center items-center gap-6 ">
              {categories.map((item, index) => (
                <div
                  key={index}
                  className={`text border-2 border-gray-500 h-[200px] w-[280px] flex flex-col items-center gap-2 justify-center rounded-lg hover:bg-black hover:text-white active:scale-95 transition-all duration-200 ease-in-out  ${category === item.label ? "border-3 border-red-500" : ""
                    } `}
                  onClick={() => setcategory(item.label)}
                >
                  <div className="icon text-3xl ">{item.icon}</div>
                  <div className={`text text-3xl  `}>{item.label}</div>
                </div>
              ))}
            </div>
            {/* types div start */}
            <h3 className="mt-[80px] text-3xl font-bold">
              What type of place will guests have?
            </h3>
            <div className="categories-types w-full my-4 flex flex-col gap-6">
              {types?.map((item, index) => (
                <div
                  key={index}
                  className={`categories-type border flex justify-between items-center md:w-[80%] p-6 rounded-lg    ${type === item.name ? "border-3 border-red-500" : ""
                    } `}
                  onClick={() => settype(item.name)}
                >
                  <div className="text ">
                    <div className="name text-3xl font-mono">{item.name}</div>
                    <p className="description text-2xl tracking-tighter font-mono">
                      {item.description}
                    </p>
                  </div>

                  <div className="icon text-4xl font-extrabold">
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* location */}
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
                  name="streetAdress"
                  value={formLocation.streetAdress}
                  onChange={handleChangeLocation}
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
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                />
              </div>
              <div className="location md:w-[45%] w-full">
                <p className="city text-2xl tracking-tight font-mono">City</p>
                <input
                  className="border-1 border-gray-500 w-full p-4 text-2xl rounded-md outline-none"
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={handleChangeLocation}
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
                  value={formLocation.province}
                  onChange={handleChangeLocation}
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
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                />
              </div>
            </div>

            <h3 className="mt-[50px] text-3xl font-bold">
              Share some basics about your place
            </h3>

            {/* // basics guest bedroom bedds  */}
            <div className="basics my-4  flex flex-wrap gap-10">
              <div className="basic border-1 border-gray-500 w-[280px] flex items-center  gap-6 p-4 rounded-lg">
                <p className="text-2xl">Guest</p>
                <div className="basic-count flex items-center gap-4">
                  <IoIosRemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setguestCount(guestCount - 1);
                    }}
                    className="text-3xl font-bold cursor-pointer text-black "
                  />
                  <p className="text-2xl">{guestCount}</p>
                  <IoIosAddCircleOutline
                    onClick={() => setguestCount(guestCount + 1)}
                    className="text-3xl font-bold cursor-pointer text-black "
                  />
                </div>
              </div>

              <div className="basic border-1 border-gray-500 w-[280px] flex items-center  gap-6 p-4 rounded-lg">
                <p className="text-2xl">Bedrooms</p>
                <div className="basic-count flex items-center gap-4">
                  <IoIosRemoveCircleOutline
                    onClick={() => {
                      bedroomsCount > 1 && setbedroomsCount(bedroomsCount - 1);
                    }}
                    className="text-3xl font-bold cursor-pointer text-black "
                  />
                  <p className="text-2xl">{bedroomsCount}</p>
                  <IoIosAddCircleOutline
                    onClick={() => setbedroomsCount(bedroomsCount + 1)}
                    className="text-3xl font-bold cursor-pointer text-black "
                  />
                </div>
              </div>

              <div className="basic border-1 border-gray-500 w-[280px] flex items-center  gap-6 p-4 rounded-lg">
                <p className="text-2xl">Beds</p>
                <div className="basic-count flex items-center gap-4">
                  <IoIosRemoveCircleOutline
                    onClick={() => {
                      bedCount > 1 && setbedCount(bedCount - 1);
                    }}
                    className="text-3xl font-bold cursor-pointer text-black "
                  />
                  <p className="text-2xl">{bedCount}</p>
                  <IoIosAddCircleOutline
                    onClick={() => setbedCount(bedCount + 1)}
                    className="text-3xl font-bold cursor-pointer text-black "
                  />
                </div>
              </div>

              <div className="basic border-1 border-gray-500 w-[280px] flex items-center  gap-6 p-4 rounded-lg">
                <p className="text-2xl">Bathrooms</p>
                <div className="basic-count flex items-center gap-4">
                  <IoIosRemoveCircleOutline
                    onClick={() => {
                      bathrooms > 1 && setbathrooms(bathrooms - 1);
                    }}
                    className="text-3xl font-bold cursor-pointer text-black "
                  />
                  <p className="text-2xl">{bathrooms}</p>
                  <IoIosAddCircleOutline
                    onClick={() => setbathrooms(bathrooms + 1)}
                    className="text-3xl font-bold cursor-pointer text-black "
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ///creating ist step2 start */}
          <div className="create-listing-step-2 my-8">
            <h3 className="text-4xl  text-red-500 my-3 font-extrabold">
              Step 2: Tell us about your place
            </h3>
            <hr />

            <h3 className="mt-[50px] text-3xl font-bold">
              Tell guests what your place has offer
            </h3>

            <div className="categories-boxes my-4  flex flex-wrap justify-center items-center gap-6 ">
              {facilities.map((item, index) => (
                <div
                  onClick={() => handleSelectAminities(item)}
                  key={index}
                  className={`text border-2 border-gray-500 h-[200px] w-[280px] flex flex-col items-center gap-2 justify-center rounded-lg hover:bg-black hover:text-white active:scale-95 transition-all duration-200 ease-in-out 
                    ${amenities.includes(item) ? "border-3 border-red-500" : ""
                    }  `}
                >
                  <div className="icon text-3xl ">{item.icon}</div>
                  <div className="text text-2xl ">{item.name}</div>
                </div>
              ))}
            </div>

            <h3 className="mt-[50px] text-3xl font-bold">
              Add some photos of your place
            </h3>

            <DragDropContext onDragEnd={handleDragPhotos}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos p-4 justify-center flex-col  my-10 rounded-md flex "
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          className="alone hidden"
                          type="file"
                          accept="image/*"
                          id="image"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label
                          htmlFor="image"
                          className=" w-[400px] h-[400px] flex flex-col justify-center items-center border-1 border-gray-500 rounded-md"
                        >
                          <div className="icon text-4xl">
                            <GrGallery />{" "}
                          </div>
                          <p className="text-3xl tracking-tight">
                            {" "}
                            Upload from your profile
                          </p>
                        </label>
                      </>
                    )}

                    <div className="flex-gap-5">
                      {photos.length >= 1 && (
                        <>
                          {photos.map((photo, index) => {
                            return (
                              <Draggable
                                key={index}
                                draggableId={index.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className="photo m-4 w-fit "
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <div className="relative">
                                      <div className="image h-[300px]">
                                        <img
                                          className=" relative  w-full h-full  object-center object-cover"
                                          src={URL.createObjectURL(photo)}
                                          alt="place"
                                        />
                                      </div>
                                      <button
                                        className=" absolute top-[2%] right-[2%] text-3xl text-red-600 font-extrabold"
                                        type="button"
                                        onClick={() =>
                                          handleRemovePhotos(index)
                                        }
                                      >
                                        <BiTrash />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}

                          <input
                            className="together hidden"
                            type="file"
                            accept="image/*"
                            id="image"
                            onChange={handleUploadPhotos}
                            multiple
                            required
                          />
                          <label
                            htmlFor="image"
                            className=" w-[400px] h-[400px] flex flex-col justify-center items-center border-1 border-gray-500 rounded-md"
                          >
                            <div className="icon ">
                              <GrGallery className="text-4xl" />{" "}
                            </div>
                            <p className="text-3xl tracking-tight">
                              Upload from your profile
                            </p>
                          </label>
                        </>
                      )}
                    </div>

                    { }

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3 className="mt-[50px] text-3xl font-bold capitalize">
              What make your place attractive and exciting?
            </h3>

            <div className="description w-[70%] my-8 flex flex-col gap-8">
              <div>
                <p className="text-2xl tracking-tight">Title</p>
                <input
                  className="border-1 border-gray-500 w-full p-4 text-2xl rounded-md outline-none"
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleChangeDescription}
                  value={formDescription.title}
                  required
                />
              </div>
              <div>
                <p className="text-2xl tracking-tight">Description</p>

                <textarea
                  className="border-1 border-gray-500 w-full p-4 text-2xl rounded-md outline-none resize-none"
                  name="description"
                  id="description"
                  placeholder="Description"
                  onChange={handleChangeDescription}
                  value={formDescription.description}
                ></textarea>
              </div>
              <div>
                <p className="text-2xl tracking-tight">Highlight</p>

                <input
                  className="border-1 border-gray-500 w-full p-4 text-2xl rounded-md outline-none"
                  type="text"
                  placeholder="Highlight"
                  name="highlight"
                  required
                  onChange={handleChangeDescription}
                  value={formDescription.highlight}
                />
              </div>
              <div>
                <p className="text-2xl tracking-tight">Highlight details</p>
                <textarea
                  className="border-1 border-gray-500 w-full p-4 text-2xl rounded-md outline-none resize-none"
                  name="highlightDesc"
                  id="highlightDesc"
                  placeholder="hightlightDesc"
                  onChange={handleChangeDescription}
                  value={formDescription.highlightDesc}
                ></textarea>
              </div>

              <div className="price">
                <p className="text-2xl tracking-tight mb-4">
                  Now set your Price
                </p>
                <div className="flex items-center gap-4  ">
                  <span className="text-3xl font-bold justify-center">$</span>
                  <input
                    className="border-1 border-gray-500 p-4 text-2xl rounded-md outline-none"
                    type="number"
                    placeholder="Price"
                    name="price"
                    onChange={handleChangeDescription}
                    value={formDescription.price}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
  <button className=" p-4 text-4xl bg-blue-950 hover:to-blue-700 active:scale-95 transition-all duration-300 hover:shadow-xl hover:shadow-black text-white w-fit rounded-lg " type="submit" >Create your Listing</button>

          </div>
        
        </form>
      </div>
    </>
  );
};

export default CreateListing;
