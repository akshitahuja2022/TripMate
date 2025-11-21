import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import { handleError, handleSuccess } from "../Cards/Notification";

const LoginPage = () => {
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
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const { message, success, user, error } = await response.json();

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
    <div className="w-full min-h-screen from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Trip<span className="text-blue-600">Mate</span>
          </h1>
          <p className="text-gray-600 text-sm">
            Welcome back to your adventures
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          <div className="space-y-2 mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm"
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
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg  outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end mb-2">
            <Link
              to="#"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-400 text-white font-semibold text-sm sm:text-base"
          >
            Login
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
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
