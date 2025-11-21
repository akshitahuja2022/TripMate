import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "trip-book-users",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  destination: { type: String, required: true },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PaymentModel = mongoose.model("payment-users", paymentSchema);
export default PaymentModel;
