import BookingModel from "../models/booking.js";

const registerController = async (req, res) => {
  const { name, email, destination, travelType, age, phoneNumber, startDate } =
    req.body;

  try {
    const bookUser = new BookingModel({
      name,
      email,
      destination,
      travelType,
      age,
      phoneNumber,
      startDate,
    });

    await bookUser.save();

    res.status(200).json({
      message: "Registration Successfully",
      success: true,
      bookUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Someting Went Wrong",
      success: false,
      error: error.message,
    });
  }
};

export default registerController;
