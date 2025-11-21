import express, { Router } from "express";
import {
  loginValidation,
  signupValidation,
} from "../middleware/authValidation.js";
import { login, logout, signup } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signupValidation, signup);
authRouter.post("/login", loginValidation, login);
authRouter.get("/logout", logout);

export default authRouter;
