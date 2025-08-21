import express from "express";
import Booking from "../model/booking_model.js";

export const userIdConroller = async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    if(!trips || trips.length === 0 ){
       return res.status(404).json({ message: 'no trip found' });
    }

    res.status(202).json(trips);
  } catch (err) {
    res
      .status(500)
      .json({ message: "cannot fiind any trips", error: err.message });
  }
};