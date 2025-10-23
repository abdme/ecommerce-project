//import { useState } from "react";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import { Routes, Route } from "react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path="checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;
