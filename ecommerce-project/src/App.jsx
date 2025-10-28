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
    axios.get("api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("api/cart-items?expand=productBut ").then((response) => {
      setCart(response.data);
    });
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
      <Route path="orders" element={<Orders />} />
      <Route path="tracking" element={<Tracking />} />
      <Route path="*" element={<div>404 Page Not Found!!</div>} />
    </Routes>
  );
}

export default App;
