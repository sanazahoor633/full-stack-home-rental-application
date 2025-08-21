
import Listing from "../model/listingModel.js";

export const searchController = async (req, res) => {
      const {search} = req.params
try{
  let listings = [];
  if(search === 'all') {
    listings = await Listing.find().populate('creator');
  } else {
    listings =  await Listing.find({
        $or: [
    { category: { $regex: search, $options: 'i' } },
    { title: { $regex: search, $options: 'i' } },
    { country: { $regex: search, $options: 'i' } }, // optional extra
    { city: { $regex: search, $options: 'i' } }     // optional extra
  ]
    }).populate('creator')

  }
res.status(200).json({listings})
} catch(err) {
 res
      .status(409)
      .json({ message: "failed to fetch listing", error: err.message });
}
}