// src/App.js
import { BrowserRouter, Routes, Route, Navigate,Outlet } from "react-router-dom";

// Auth pages
import Login from "./features/auth/pages/Login/Login";
import SignUp from "./features/auth/pages/SignUp/SignUp";
import ForgotPassword from "./features/auth/pages/ForgotPassword/ForgotPassword";

// Dashboard pages
import Dashboard from "./features/dashboard/pages/Dashboard/Dashboard";
import Products from "./features/dashboard/pages/Products/Products";
import Orders from "./features/dashboard/pages/MyOrders/Orders";
import Shop from "./features/dashboard/pages/Shop/Shop";
import Favorites from "./features/dashboard/pages/Favorites/Favorites";
// import Account from "./features/dashboard/pages/Account/Account";

// // Public info pages (OUTSIDE dashboard)
// import About from "./features/misc/About";
// import Contact from "./features/misc/Contact";

// Layout for dashboard (sidebar + <Outlet />)
import AppLayout from "./layouts/AppLayout";

import "./styles/global.css";

//Checks if there is Logged User before every Critical Route.
import { AuthProvider, useAuth } from "./features/auth/components/AuthProvider";

function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) return null; // or spinner while checking
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}




export default function App() {
  return (
    <BrowserRouter>
       <AuthProvider>

      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/reset" element={<ForgotPassword />} />

        {/* Public info pages (outside dashboard layout)
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}

        {/* Dashboard routes (all pages inside /dashboard/*) */}
         <Route element={<RequireAuth />}>

        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="shop" element={<Shop />} />
          <Route path="compare" element={<Placeholder>Compare Prices</Placeholder>} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          {/* <Route path="account" element={<Account />} /> */}
          {/* fallback inside dashboard */}
          <Route path="*" element={<Navigate to="." replace />} />
        </Route>
        </Route>

        {/* fallback for any unknown path */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      </AuthProvider>

    </BrowserRouter>
  );
}

// simple placeholder styling
function Placeholder({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        minHeight: 300,
        display: "grid",
        placeItems: "center",
        fontSize: 22,
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
}