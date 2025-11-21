import React, { useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { handleError, handleSuccess } from "../Cards/Notification";
import { useNavigate } from "react-router-dom";
import { packages } from "../Data/BookingPackages";

const ReviewPage = () => {
  const { reviewData, setReviewData, isLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const travelTypes = ["solo", "group", "couple"];

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      handleError("Please login first to continue review.");
      return navigate("/login");
    }

    const payload = {
      name: reviewData.name,
      city: reviewData.city,
      travelType: reviewData.travelType,
      description: reviewData.description,
      tripDestination: reviewData.tripDestination,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const { message, success, error } = await response.json();

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/"), 2000);
      } else if (error) {
        handleError(error);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 sm:py-10 mt-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-3xl sm:text-4xl lg:text-3xl font-bold text-gray-900 mb-3">
            Travel Review Page
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
          <form
            onSubmit={handleReviewSubmit}
            className="space-y-6"
            autoComplete="off"
          >
            <div className="space-y-2">
              <label className="block text-md font-semibold text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={reviewData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-md font-semibold text-gray-700">
                Your City
              </label>
              <input
                type="text"
                name="city"
                value={reviewData.city}
                onChange={handleChange}
                required
                placeholder="Enter your city"
                className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-md font-semibold text-gray-700">
                Travel Type
              </label>
              <select
                name="travelType"
                value={reviewData.travelType}
                onChange={handleChange}
                required
                className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select travel type</option>
                {travelTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-md font-semibold text-gray-700">
                Trip Destination
              </label>

              <select
                name="tripDestination"
                value={reviewData.tripDestination}
                onChange={handleChange}
                required
                className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="travelDestination">
                  Select Travel Destination
                </option>
                {packages.map((p, index) => (
                  <option key={index} value={p.destination}>
                    {p.destination}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-md font-semibold text-gray-700">
                Your Experience
              </label>
              <textarea
                name="description"
                value={reviewData.description}
                onChange={handleChange}
                required
                placeholder="Share your travel experience, highlights, and recommendations..."
                rows={6}
                className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex gap-4 pt-6 border-gray-200">
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-lg text-white font-semibold bg-blue-700 hover:bg-blue-500 cursor-pointer transition-colors text-sm sm:text-base"
              >
                Add Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
