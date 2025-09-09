import { createContext, useContext, useEffect, useState,useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       
  const [loading, setLoading] = useState(true);  //
  const [redirectPath, setRedirectPath] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  //need to fix API in production.
  const API = "http://localhost:4000";         
  useEffect(() => {
    if (!user && !loading) {
      setRedirectPath(location.pathname);
    }
  }, [user, loading, location]);
  

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        const res = await fetch(`${API}/auth`, {
          method: "GET",
          credentials: "include", 
        });

        if (!res.ok) {
          if (!cancelled) setUser(null);
          
          return ;
        }

        const json = await res.json(); // { login: boolean, data?: decoded }
        if (!cancelled) {
          if (json.login && json.data) {
            // normalize user shape (pick what you need from data)
            const { id, email, ...rest } = json.data;
            setUser({ id, email, ...rest });
          } else {
            setUser(null);
          }
        }
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    hydrate();
    return () => { cancelled = true; };
  }, [API]);

  // Call backend to set/clear cookie
  const login = async (email, password) => {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",             
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");

    // After successful login, re-check who we are
    const me = await fetch(`${API}/auth`, { credentials: "include" });
    if (!me.ok) throw new Error("Auth check failed after login");
    const json = await me.json();
    if (json.login && json.data) {
      const { id, email: em, ...rest } = json.data;
      setUser({ id, email: em, ...rest });
      navigate(redirectPath || "/dashboard", { replace: true });
      setRedirectPath(null); // clear it
    } else {
      setUser(null);
    }
  };

  const logout = async () => {
    await fetch(`${API}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
     window.location.href = "/login";
  };

  const value = useMemo(
    () => ({ user, setUser, loading, login, logout, redirectPath }),
    [user, loading, redirectPath]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}