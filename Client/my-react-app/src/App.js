// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth pages
import Login from "./features/auth/pages/Login/Login";
import SignUp from "./features/auth/pages/SignUp/SignUp";
import ForgotPassword from "./features/auth/pages/ForgotPassword/ForgotPassword";

// Dashboard (real page you already have)
import Dashboard from "./features/dashboard/pages/Dashboard/Dashboard";
import Products from "./features/dashboard/pages/Products/Products";
import Orders from "./features/dashboard/pages/MyOrders/Orders";


// Layout that renders the fixed Sidebar + <Outlet />
import AppLayout from "./layouts/AppLayout";

import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/reset" element={<ForgotPassword />} />

        {/* App routes inside the layout (sidebar on the left, content on the right) */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Sidebar-linked routes (placeholders for now) */}
          <Route path="/shop" element={<div style={box}>Create Cart</div>} />
          <Route path="/compare" element={<div style={box}>Compare Prices</div>} />
          <Route path="/favorites" element={<div style={box}>Favorites</div>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/account" element={<div style={box}>My Account</div>} />
        </Route>

        {/* Catch-all: send unknown routes to dashboard if logged-in layout is mounted, else to login */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// simple placeholder styling so the areas look like cards
const box = {
  background: "#fff",
  borderRadius: 12,
  padding: 20,
  minHeight: 300,
  display: "grid",
  placeItems: "center",
  fontSize: 22,
  fontWeight: 700,
};
