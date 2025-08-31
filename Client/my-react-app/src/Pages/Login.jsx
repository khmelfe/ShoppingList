import { useState } from "react";
import "../index.js";
import "./login.css";

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.98 2.38 30.47 0 24 0 14.64 0 6.45 5.48 2.56 13.44l7.98 6.19C12.19 13.09 17.68 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24.5c0-1.61-.15-3.16-.42-4.66H24v9.12h12.7c-.55 2.82-2.2 5.2-4.7 6.8l7.27 5.64C43.73 37.18 46.5 31.3 46.5 24.5z"/>
      <path fill="#FBBC05" d="M10.54 28.64A13.49 13.49 0 0 1 9.5 24c0-1.64.28-3.22.79-4.64l-7.98-6.19A23.88 23.88 0 0 0 0 24c0 3.86.93 7.52 2.56 10.84l7.98-6.2z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.27-5.64c-2.02 1.36-4.62 2.17-8.63 2.17-6.32 0-11.81-3.59-13.92-8.94l-7.98 6.2C6.45 42.52 14.64 48 24 48z"/>
    </svg>
  );
}


export default function Login() {
  const [mode, setMode] = useState("email"); // "email" or "username"
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);

  // regex
  const usernameRe = /^[A-Za-z]{8,16}$/;
  const emailRe    = /^\S+@\S+\.\S+$/;
  const passwordRe = /^(?=.*[A-Z])(?=.*[@!?])[A-Za-z0-9@!?]{8,16}$/;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (mode === "username" && !usernameRe.test(form.username)) {
      e.username = "8–16 letters (A–Z or a–z) only.";
    }
    if (mode === "email" && !emailRe.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!passwordRe.test(form.password)) {
      e.password = "8–16 chars, ≥1 uppercase, ≥1 special (@, !, ?).";
    }
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload =
        mode === "email"
          ? { email: form.email, password: form.password }
          : { username: form.username, password: form.password };

      // call backend
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Login failed");
      window.location.href = "/";
    } catch (e) {
      setErr({ api: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="auth-card">
      <div className="brand-icon" aria-hidden>🛒</div>
      <h2 className="title">Welcome Back 👋</h2>
      <p className="subtitle">Sign in to find the cheapest shopping near you.</p>

      {/* Mode Toggle */}
      <div className="mode-toggle">
        <label>
          <input
            type="radio"
            name="mode"
            value="email"
            checked={mode === "email"}
            onChange={() => setMode("email")}
          />
          Sign in with Email
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="username"
            checked={mode === "username"}
            onChange={() => setMode("username")}
          />
          Sign in with Username
        </label>
      </div>

      {err.api && <div className="error" role="alert">{err.api}</div>}

      <form onSubmit={onSubmit} noValidate>
        {mode === "email" && (
          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={form.email}
              onChange={onChange}
              aria-invalid={!!err.email}
            />
            {err.email && <div className="error">{err.email}</div>}
          </div>
        )}
        {mode === "username" && (
          <div className="field">
            <label className="label" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              className="input"
              placeholder="Enter your username"
              value={form.username}
              onChange={onChange}
              aria-invalid={!!err.username}
            />
            {err.username && <div className="error">{err.username}</div>}
          </div>
        )}

        <div className="field">
          <label className="label" htmlFor="pw">Password</label>
          <input
            id="pw"
            name="password"
            type="password"
            className="input"
            placeholder="Enter your password"
            value={form.password}
            onChange={onChange}
            aria-invalid={!!err.password}
          />
          {err.password && <div className="error">{err.password}</div>}
        </div>

        <button className="primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        className="google"
        type="button"
        onClick={() => window.location.href="https://myaccount.google.com/"}
      >
        <GoogleIcon />
        <span>Continue with Google</span>
      </button>

      <div className="split">
        <a href="/register">Sign up!</a>
        <a href="/reset">Forgot Password?</a>
      </div>

      <p className="footer-note">Cheapest Shopping List Near Me</p>
    </div>
    
  );
}
