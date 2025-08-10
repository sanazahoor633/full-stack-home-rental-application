import express from "express";
// import User from "../model/authModel.js";
import Listing from "../model/listingModel.js";
const router = express.Router();
import multer from "multer";
// import { listingDetails } from "../controllers/listingControllert.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      firstName,
      category,
      type,
      streetAdress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomsCount,
      bedCount,
      bathrooms,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    // const user = await User.findById(creator);

    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res.status(501).json("no file uploaded");
    }
    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      firstName,
      category,
      type,
      streetAdress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomsCount,
      bedCount,
      bathrooms,
      listingPhotoPaths,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });
    await newListing.save();
    res.status(200).json(newListing);
  } catch (err) {
    res
      .status(409)
      .json({ message: "failed to create listing", error: err.message });
    console.log(err);
  }
});

//get listing

router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listings;

    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate('creator');
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(409)
      .json({ message: "failed to fetch listing", error: err.message });
    console.log(err);
  }
});


// listing detail

router.get('/:listingId', async (req, res) => {
  try{
const {listingId} = req.params
const listing = await Listing.findById(listingId).populate('creator', 'firstname lastname profileImagePath');
if(!listing) {
  return res.status(400).json({message: 'listing not found'})
}

res.status(200).json(listing)
  }
  catch(err){
res.status(400).json({error: err.message})
  }
});
export default router;


