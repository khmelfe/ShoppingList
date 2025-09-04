import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);        // e.g. { id, email }
  const [loading, setLoading] = useState(true);  // true until first /auth completes
  const API = "http://localhost:4000";           

  // Check session on first mount (runs on refresh)
  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        const res = await fetch(`${API}/auth`, {
          method: "GET",
          credentials: "include", // send cookie
        });

        if (!res.ok) {
          if (!cancelled) setUser(null);
          return;
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
      credentials: "include",             // important so cookie is saved
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
  };

  const value = useMemo(() => ({ user, setUser, loading, login, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}