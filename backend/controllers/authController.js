import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendMail } from "../utils/email.js";

dotenv.config();

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exist with this email",
        success: false,
      });
    }

    const userModel = new UserModel({ name, email, password });

    userModel.password = await bcrypt.hash(password, 12);
    await userModel.save();

    // send mail
    await sendMail(
      email,
      "Welcome to TripMate 🎉",
      `
      <h2>Hello ${name},</h2>
      <p>You have successfully created your TripMate account.</p>
      <p>Start planning trips and meet travel buddies!</p>
    `
    );

    const jwtToken = jwt.sign(
      {
        _id: userModel._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("userToken", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Signup Successfully",
      success: true,
      user: {
        name: userModel.name,
        email: userModel.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(409).json({
        message: "Invalid Details",
        success: false,
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(403).json({
        message: "Invalid Details",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("userToken", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login Successfully",
      success: true,
      jwtToken,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export { signup, login, logout };
