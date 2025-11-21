import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { handleError, handleSuccess } from "../Cards/Notification";
import { packages } from "../Data/BookingPackages";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const navigate = useNavigate();
  const { registerData, setRegisterData, isLogin } = useContext(AuthContext);
  const [amount, setAmount] = useState(0);

  const startPayment = async (bookingId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        }
      );
      const data = await response.json();

      if (!data.success) {
        handleError("Unable to create order");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.data.amount,
        currency: "INR",
        name: "TripMate Booking",
        description: "Trip Payment",
        order_id: data.data.id,
        handler: async function (response) {
          const verifyRes = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: bookingId,
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            handleSuccess("Payment Successful!");
            setTimeout(() => navigate("/packageDetails"), 2000);
          } else {
            handleError("Payment verification failed!");
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      handleError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));

    if (name === "destination") {
      const selectedPackage = packages.find((p) => p.destination === value);

      if (selectedPackage) {
        const numericPrice = Number(selectedPackage.price.replace(/,/g, ""));
        setAmount(numericPrice);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      handleError("Please login first to continue booking.");
      return navigate("/login");
    }

    const payload = {
      name: registerData.name,
      email: registerData.email,
      age: registerData.age,
      phoneNumber: registerData.phoneNumber,
      destination: registerData.destination,
      travelType: registerData.travelType,
      startDate: registerData.startDate,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const { message, error, success, bookUser } = await response.json();
      if (success) {
        if (bookUser && bookUser._id) {
          handleSuccess(message);
          startPayment(bookUser._id);
        }
      } else if (error) {
        handleError(error);
      } else if (!error) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="m-auto mt-20 inset-0  flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh]">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex justify-between items-center">
          <h1 className="text-xl sm:text-3xl text-center m-auto font-bold text-gray-900">
            Provide Your Details to Confirm Your Trip
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6" autoComplete="off">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={registerData.name}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={registerData.email}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                name="age"
                value={registerData.age}
                onChange={handleChange}
                placeholder="Age"
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="phoneNumber"
                value={registerData.phoneNumber}
                placeholder="PhoneNumber"
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-4 mt-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Trip Destination
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                name="destination"
                value={registerData.destination}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="destination">Select Travel Destination</option>
                {packages.map((p, index) => {
                  return (
                    <option key={index} value={p.destination}>
                      {p.destination}
                    </option>
                  );
                })}
              </select>

              <select
                name="travelType"
                value={registerData.travelType}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="solo">Solo Traveler</option>
                <option value="group">Group Travel</option>
                <option value="couple">Couple</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 mt-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              StartDate
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                name="startDate"
                value={registerData.startDate}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <p className="mt-3 text-center text-xl font-bold text-blue-800">
                Trip Amount: ₹ {amount || 0}
              </p>
            </div>
          </div>

          <div className="m-auto flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg text-white font-medium bg-green-500 cursor-pointer"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
