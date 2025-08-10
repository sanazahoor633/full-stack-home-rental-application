import Listing from "../model/listingModel.js"

export const listingDetails = async (req, res) => {
  try{
const {listingId} = req.params
const listing = await Listing.findById(listingId).populate('creator');
if(!listing) {
  return res.status(400).json({message: 'listing not found'})
}

res.status(200).json(listing)
  }
  catch(err){
res.status(400).json({error: err.message})
  }
}
