import User from "../model/authModel.js";
import Listing from "../model/listingModel.js";

export const listingToWishlist = async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");
    const favouriteListing = user.wishList.find((item) => item._id.toString() === listingId);
//  const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId)

    ////
     


    if (favouriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );

     
      await user.save();
      res
        .status(200)
        .json({
          message: "Lising in removed from wish list",
          wishList: user.wishList,
        });
    } else {
      user.wishList.push(listing);
      await user.save();
      res
        .status(201)
        .json({
          message: "Lising is added to wishList",
          wishList: user.wishList,
        });
    }
  } catch (err) {
  res.status(505).json({ error: err.message })
  }
};

