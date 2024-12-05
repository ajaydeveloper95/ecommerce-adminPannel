import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  // State for form fields
  const [productName, setProductName] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      productName,
      images,
      price,
      category,
      description,
    };

    try {
      const response = await axios.post(
        "https://ajay.yunicare.in/api/product/createproduct",
        productData
      );
      console.log("Product added successfully:", response.data);
      // You can reset the form or show a success message
    } catch (error) {
      console.error("Error adding product:", error);
      // You can handle the error and show an error message
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white py-10">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        {/* Product Name */}
        <div>
          <label
            htmlFor="productName"
            className="block text-lg font-semibold text-pink-600"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full p-3 mt-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        {/* Images */}
        <div>
          <label
            htmlFor="images"
            className="block text-lg font-semibold text-pink-600"
          >
            Image URLs (comma separated)
          </label>
          <input
            type="text"
            id="images"
            value={images.join(", ")}
            onChange={(e) => setImages(e.target.value.split(",").map((url) => url.trim()))}
            required
            className="w-full p-3 mt-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-lg font-semibold text-pink-600"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-3 mt-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-lg font-semibold text-pink-600"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-3 mt-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-semibold text-pink-600"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full p-3 mt-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-pink-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-pink-700 focus:outline-none"
          >
            ADD PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
