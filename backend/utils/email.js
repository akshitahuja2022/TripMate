import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export const sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `TripMate <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("Email Sent Successfully");
  } catch (error) {
    console.log("Email failed:", error.message);
  }
};
