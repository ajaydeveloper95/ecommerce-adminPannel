import React from "react";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white py-10 mt-20">
      {/* Welcome Section */}
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">
        Welcome to Women's Fashion Store
      </h1>

      {/* Image Section */}
      <div className="text-center mb-8">
        <img
          src="./fashion.png" // Replace with your image URL
          alt="Fashion Store Banner"
          className="mx-auto w-full max-w-6xl rounded-md shadow-lg"
        />
      </div>

      {/* Add New Product Button */}
      <div className="text-center mb-8">
        <Link to="/addproduct">
          <button className="bg-pink-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-pink-700 focus:outline-none">
            ADD NEW PRODUCT
          </button>
        </Link>
      </div>

      {/* Cart Section */}
      <Cart />
    </div>
  );
};

export default HomePage;
