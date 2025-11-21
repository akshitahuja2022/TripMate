import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import PaymentModel from "../models/payment.js";
import BookingModel from "../models/booking.js";

dotenv.config();

const paymentRouter = express.Router();

// create instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// order
paymentRouter.post("/order", (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Something Went Wrong!", success: false });
      }
      res.status(200).json({
        message: "Order Created Successfully",
        success: true,
        data: order,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: error.message,
    });
  }
});

// verify
paymentRouter.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingId,
  } = req.body;

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;

    const booking = await BookingModel.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (isAuthentic) {
      const payment = new PaymentModel({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        bookingId,
        name: booking.name,
        email: booking.email,
        destination: booking.destination,
      });

      await payment.save();

      res.status(200).json({
        message: "Verify Successfully",
        success: true,
        payment,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error! ",
      success: true,
      error: error.message,
    });
  }
});
export default paymentRouter;
