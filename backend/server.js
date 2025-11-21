import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bookingRouter from "./routes/bookingRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
dotenv.config();

// connect mongodb
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRouter);
app.use("/api", bookingRouter);
app.use("/api/payment", paymentRouter);
app.use("/api", reviewRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the TripMate & Planning server");
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Server is running on http://localhost:4000");
});
