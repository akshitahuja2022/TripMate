import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  destination: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  age: { type: String, required: true },
  travelType: {
    type: String,
    enum: ["solo", "couple", "group"],
    required: true,
  },
  startDate: Date,
});
const BookingModel = new mongoose.model("trip-book-users", bookingSchema);
export default BookingModel;
