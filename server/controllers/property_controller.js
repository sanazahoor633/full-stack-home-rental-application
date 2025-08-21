import Booking from "../model/booking_model.js";
import Listing from "../model/listingModel.js";

export const propertyController = async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    // if(!properties || properties.length === 0 ){
    //    return res.status(404).json({ message: 'no properties found' });
    // }

    res.status(202).json(properties);
  } catch (err) {
    res
      .status(500)
      .json({ message: "cannot find any properties", error: err.message });
  }
};