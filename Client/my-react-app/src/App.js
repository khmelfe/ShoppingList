import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";  // ✅ import
import "./styles/global.css";
import Test_Backend from "./Pages/Test_Backend"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} /> {/* ✅ new route */}
        </Route>
        <Route path="*" element={<Login />} />
        <Route path = "Well" element={<Test_Backend/>} />
      </Routes>
    </BrowserRouter>
  );
}
