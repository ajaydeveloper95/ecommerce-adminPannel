import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls
import { useNavigate } from "react-router-dom"; // To navigate after successful login
import { ToastContainer, toast } from "react-toastify"; // To show toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast CSS
import { domainBase } from "../../api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to API
      const response = await axios.post(`${domainBase}api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      // Check if the API response is successful
      if (response.data && response.data.accessToken) {
        const { accessToken, userData } = response.data;

        // Store token in localStorage
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("userData", JSON.stringify(userData));
        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error("Login error:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #fce7f3, #f8fafc)",
      }}
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-gray-600 text-sm mt-6 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-pink-500 hover:underline">
            Sign up here
          </a>
        </p>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
