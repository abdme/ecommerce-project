//import { useState } from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path="checkout" element={<div>Test Checkout Path</div>} />
    </Routes>
  );
}

export default App;
