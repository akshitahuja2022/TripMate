import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { handleError, handleSuccess } from "../Cards/Notification";

const SignupPage = () => {
  const navigate = useNavigate();
  const { formData, setFormData, setIsLogin, setUser } =
    useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      const { message, success, user, error } = data;
      if (success) {
        handleSuccess(message);
        setIsLogin(true);
        setUser(user);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!error) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="w-full min-h-screen  from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Trip<span className="text-blue-600">Mate</span>
          </h1>
          <p className="text-gray-600 text-sm">
            Join our travel community today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full mb-5 px-4 py-2.5 border border-gray-300 rounded-lg  outline-none text-sm"
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full mb-5 px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm"
            />
          </div>

          <div className="space-y-2 mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-5 px-4 py-2.5 rounded-lg text-white font-semibold bg-blue-600 cursor-pointer hover:bg-blue-400 text-sm sm:text-base"
          >
            Create Account
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gray-300" />
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
