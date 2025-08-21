import express from "express";
import { bookingThings,  } from "../controllers/booking_controller.js";
const router = express.Router();




router.post('/create', bookingThings)

export default router