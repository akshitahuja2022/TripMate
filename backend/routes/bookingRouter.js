import express from "express";
import registerValidation from "../middleware/registerValidation.js";
import registerController from "../controllers/registerController.js";
import BookingModel from "../models/booking.js";

const bookingRouter = express.Router();

bookingRouter.get("/allbookings/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const booking = await BookingModel.find({ email });
    res.send(booking);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching bookings", success: false });
  }
});

bookingRouter.post("/register", registerValidation, registerController);

export default bookingRouter;
