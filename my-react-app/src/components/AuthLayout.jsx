import { Outlet } from "react-router-dom";
import "../Pages/login.css"; // reuse login.css for layout styles too

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
    
  );
}

