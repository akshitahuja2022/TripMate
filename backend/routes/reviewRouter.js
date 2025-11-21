import express from "express";
import ReviewModel from "../models/review.js";

const reviewRouter = express.Router();

reviewRouter.get("/allReviews", async (req, res) => {
  const review = await ReviewModel.find();
  res.send(review);
});

reviewRouter.post("/review", async (req, res) => {
  const { name, city, travelType, description, tripDestination } = req.body;

  try {
    const review = new ReviewModel({
      name,
      city,
      travelType,
      description,
      tripDestination,
    });

    await review.save();

    res.status(200).json({
      message: "Thank you for your review! It has been successfully submitted.",
      success: true,
      review,
    });
  } catch (error) {
    res.status(403).json({
      message: "Something Went Wrong!",
      success: false,
      error: error.message,
    });
  }
});

export default reviewRouter;
