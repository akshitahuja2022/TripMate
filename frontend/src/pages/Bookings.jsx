import React from "react";
import { packages } from "../Data/BookingPackages";
import PackageCard from "../Cards/TravelPackageCard";
import { Link } from "react-router-dom";
import BookingPage from "./BookingPage";

const Bookings = ({ value1, value2 }) => {
  return (
    <div className="w-full bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Book Your Next Adventure
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Choose from curated travel packages, connect with fellow explorers,
            and enjoy seamless booking with TripMate.
          </p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            {packages.slice(value1, value2).map((pkg, idx) => (
              <PackageCard key={idx} {...pkg} />
            ))}
          </div>
          <div className="m-auto text-center mt-10">
            <Link
              to="/package"
              className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 font-medium shadow-md hover:shadow-lg"
            >
              Watch More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
