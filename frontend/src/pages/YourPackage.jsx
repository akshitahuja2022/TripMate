import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

const formatDate = (iso) => {
  if (!iso) return "N/A";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const YourPackage = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/allbookings/${user.email}`
        );
        const data = await res.json();
        setBooking(data);
      } catch (error) {
        console.log("Error fetching reviews", error);
      }
    };

    fetchReviews();
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10 mt-10">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Your Package
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Details for the package you registered. Save this page or download
            your receipt for future reference.
          </p>
        </header>

        <main className="rounded-2xl overflow-hidden">
          {booking.map((b, index) => (
            <div
              key={index}
              className="grid grid-cols-1 mb-8 border border-gray-200 rounded-2xl shadow-lg"
            >
              <div className="p-6 sm:p-8 m-auto md:m-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {b.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">{b.email}</p>
                    <div className="mt-3 text-sm text-gray-700">
                      <span className="font-medium">Travel Type:</span>{" "}
                      {b.travelType}
                    </div>
                  </div>

                  <div className="text-sm text-gray-700">
                    <div>
                      <span className="font-medium">Start Date:</span>
                    </div>
                    <div className="font-semibold mt-1">
                      {formatDate(b.startDate)}
                    </div>
                    <div className="mt-3">
                      <span className="font-medium">Age:</span> {b.age}
                    </div>
                    <div className="mt-1">
                      <span className="font-medium">Phone:</span>{" "}
                      {b.phoneNumber}
                    </div>
                  </div>
                </div>

                <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Booking ID
                    </h3>
                    <p className="text-sm text-gray-700 mt-2">{b._id}</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Status
                    </h3>
                    <p className="mt-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                        Confirmed
                      </span>
                    </p>
                  </div>
                </section>

                <section className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">
                    Notes
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>
                      • Keep your booking ID and ID proof handy while traveling.
                    </li>
                    <li>• Contact support for any changes or cancellations.</li>
                  </ul>
                </section>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 w-60 sm:w-80">
                  <button
                    onClick={() => navigate("/contact")}
                    className="flex-1 px-4 py-2 rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-400 text-white font-semibold"
                  >
                    Contact Support
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-blue-600 cursor-pointer hover:bg-blue-400 text-white font-semibold"
                    onClick={() => window.print()}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default YourPackage;
