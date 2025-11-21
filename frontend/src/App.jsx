import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Destination from "./pages/Destination";
import Package from "./pages/Package";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import ReviewPage from "./pages/ReviewPage";
import YourPackage from "./pages/YourPackage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/package" element={<Package />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/packageDetails" element={<YourPackage />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
