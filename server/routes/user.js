import express from "express";
import { userIdConroller } from "../controllers/user_id_controller.js";
import { listingToWishlist } from "../controllers/wishlist_controlller.js";
import { propertyController } from "../controllers/property_controller.js";
import { reservationController } from "../controllers/rerservation_controller.js";
const router = express.Router();


// get trip list
router.get('/:userId/trips', userIdConroller);
router.patch("/:userId/:listingId", listingToWishlist)
router.get('/:userId/properties', propertyController);
//reservation list
router.get('/:userId/reservations', reservationController);



export default router








// router.get('/create', (req, res) => {
//     res.send('this  is user route')
// })