//import { useState } from "react";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import Orders from "./pages/OrdersPage";
import axios from "axios";
import Tracking from "./pages/TrackingPage";
import { Routes, Route } from "react-router";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      let response = await axios.get("api/products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      let response = await axios.get("api/cart-items?expand=productBut");
      setCart(response.data);
    };
    fetchCart();
  }, []);
  return (
    <Routes>
      <Route
        index
        element={<HomePage cart={cart} products={products} />}
      ></Route>
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} products={products} />}
      />
      <Route
        path="orders"
        element={<Orders cart={cart} products={products} />}
      />
      <Route path="tracking" element={<Tracking />} />
      <Route path="*" element={<div>404 Page Not Found!!</div>} />
    </Routes>
  );
}

export default App;
