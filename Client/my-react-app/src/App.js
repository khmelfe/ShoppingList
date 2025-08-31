import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import "./styles/global.css";
import Dashboard from "./features/dashboard/pages/Dashboard";

import Test_Backend from "./Pages/Test_Backend"


export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />"
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/reset" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
    
  );
}