import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageIndices, setImageIndices] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Items per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://ajay.yunicare.in/api/product/getproducts"
        );
        if (response.status === 200 && Array.isArray(response.data.products)) {
          const filteredItems = response.data.products.filter(
            (item) =>
              item.category !== "mensClothing" &&
              item.category !== "Children Clothing"
          );
          setCartItems(filteredItems.reverse()); // Reverse to show the latest product first
          const initialIndices = {};
          filteredItems.forEach((item) => {
            initialIndices[item._id] = 0;
          });
          setImageIndices(initialIndices);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://ajay.yunicare.in/api/product/delete/${id}`
      );
      if (response.status === 200) {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete the product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error occurred while deleting the product");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleNext = (id, imageCount) => {
    setImageIndices((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % imageCount,
    }));
  };

  const handlePrev = (id, imageCount) => {
    setImageIndices((prev) => ({
      ...prev,
      [id]: prev[id] === 0 ? imageCount - 1 : prev[id] - 1,
    }));
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => Math.max(1, prev + direction));
  };

  // Calculate the displayed items based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = cartItems.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <section className="px-6 md:px-12">
        {/* <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
          Your Shopping Cart
        </h2> */}
        <p>Loading products...</p>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-12">
      {/* <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Your Shopping Cart
      </h2> */}
      {cartItems.length === 0 ? (
        <p>No products available in the cart.</p>
      ) : (
        <div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {displayedItems.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full h-80 bg-gray-100 overflow-hidden">
                  {item.images.length > 0 && (
                    <>
                      <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                          transform: `translateX(-${imageIndices[item._id] * 100}%)`,
                          width: `${item.images.length * 100}%`,
                        }}
                      >
                        {item.images.map((image, index) => (
                          <div
                            key={index}
                            className="w-full h-full flex-shrink-0 bg-cover bg-center"
                          >
                            <img
                              src={image}
                              alt={`Product Image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white-800 text-white rounded-full p-2 hover:bg-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev(item._id, item.images.length);
                        }}
                      >
                        &#9664;
                      </button>
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white-800 text-white rounded-full p-2 hover:bg-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext(item._id, item.images.length);
                        }}
                      >
                        &#9654;
                      </button>
                    </>
                  )}
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.productName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
                    ₹{item.price}
                  </p>
                  <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">
                    {item.description}
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      className="w-1/2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id);
                      }}
                    >
                      <FaTrashAlt className="inline mr-2" /> Delete
                    </button>
                    <button
                      className="w-1/2 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item._id);
                      }}
                    >
                      <FaEdit className="inline mr-2" /> Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => handlePageChange(-1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-600 dark:text-gray-400">
              Page {currentPage} of {Math.ceil(cartItems.length / itemsPerPage)}
            </span>
            <button
              className={`px-4 py-2 rounded-lg ${
                startIndex + itemsPerPage >= cartItems.length
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => handlePageChange(1)}
              disabled={startIndex + itemsPerPage >= cartItems.length}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
