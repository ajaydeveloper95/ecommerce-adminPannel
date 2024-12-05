import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // User is logged in
    }
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://ajay.yunicare.in/api/auth/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false); // Set to false after logout
        navigate("/login"); // Redirect to login page
        toast.success("Logout successfully!");
      }
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed! Please try again.");
    }
  };

  return (
    <nav className="bg-pink-50 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-3xl font-bold text-pink-600">
              <img src="/logo.png" width={"20%"} />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-pink-600">
              Home
            </a>
            <a href="/cart" className="text-gray-700 hover:text-pink-600">
              Shop
            </a>
            {/* <a href="/collections" className="text-gray-700 hover:text-pink-600">
              Collections
            </a>
            <a href="/contact" className="text-gray-700 hover:text-pink-600">
              Contact
            </a> */}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center mx-4 flex-1">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            {/* <a href="/cart" className="text-gray-700 hover:text-pink-600">
              <FaShoppingCart size={20} />
            </a> */}

            {/* Conditional rendering of Login/Logout icon */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-pink-600"
              >
                <FaSignOutAlt size={20} />
              </button>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-pink-600">
                <FaUserAlt size={20} />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-700 hover:text-pink-600"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-pink-50 shadow-lg">
          <a
            href="/"
            className="block px-4 py-2 text-gray-700 hover:bg-pink-200 hover:text-pink-600"
          >
            Home
          </a>
          <a
            href="/shop"
            className="block px-4 py-2 text-gray-700 hover:bg-pink-200 hover:text-pink-600"
          >
            Shop
          </a>
          {/* <a
            href="/collections"
            className="block px-4 py-2 text-gray-700 hover:bg-pink-200 hover:text-pink-600"
          >
            Collections
          </a>
          <a
            href="/contact"
            className="block px-4 py-2 text-gray-700 hover:bg-pink-200 hover:text-pink-600"
          >
            Contact
          </a> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
