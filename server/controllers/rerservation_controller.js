import Booking from "../model/booking_model.js";

export const reservationController = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
   
    res.status(202).json(reservations);
  } catch (err) {
    res
      .status(500)
      .json({ message: "cannot find any treservations", error: err.message });
  }
};