import Booking from "../model/booking_model.js";

export const bookingThings = async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });
    await newBooking.save();

    res.status(200).json({ message: "sucessfull date", newBooking });
    // res.send(' i am sanakhan')
  } catch (err) {
    res
      .status(400)
      .json({ message: "failed to create a new booking", error: err.message });
  }
};
