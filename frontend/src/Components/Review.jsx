import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

const ReviewCard = ({ name, city, description, tripDestination }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden p-6 sm:p-8">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            {name}
          </h3>
          <p className="text-sm text-gray-500">{city}</p>
        </div>
      </div>

      <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed mb-4 line-clamp-4">
        "{description}"
      </p>

      {tripDestination && (
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">
            <span className="font-bold text-black">Destination:</span>{" "}
            {tripDestination}
          </p>
        </div>
      )}
    </div>
  );
};

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/allReviews`
        );
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.log("Error fetching reviews", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            What Our Travelers Say
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Real stories from real adventurers
          </p>
          <div className="m-auto text-center mt-10">
            <Link
              to="/review"
              className="bg-blue-700 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-500 font-medium shadow-md hover:shadow-lg"
            >
              Add a Review
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {reviews.map((t, idx) => (
            <ReviewCard key={idx} {...t} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
