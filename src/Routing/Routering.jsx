import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../components/Pages/HomePage";
import Navbar from "../components/Navbar/Navbar";
import Login from "../components/Pages/Login";
import Register from "../components/Pages/Register";
import AddProduct from "../components/Pages/AddProduct";
import EditProduct from "../components/Pages/EditProduct";
import Cart from "../components/Cart/Cart";

function Routering() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addProduct" element={<AddProduct/>} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default Routering;
