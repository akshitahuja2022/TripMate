import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  travelType: {
    type: String,
    required: true,
    enum: ["solo", "group", "couple"],
  },
  description: { type: String, required: true },
  tripDestination: { type: String, required: true },
});

const ReviewModel = mongoose.model("tripMate-reviews", reviewSchema);
export default ReviewModel;
