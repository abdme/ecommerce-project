//import { useState } from "react";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import Orders from "./pages/OrdersPage";
import Tracking from "./pages/TrackingPage";
import { Routes, Route } from "react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<Orders />} />
      <Route path="tracking" element={<Tracking />} />
    </Routes>
  );
}

export default App;
