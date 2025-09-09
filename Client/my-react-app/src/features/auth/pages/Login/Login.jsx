// src/features/auth/pages/Login.jsx
import { useState } from "react";


import Button from "../../../../components/Button/Button";
import AuthCard from "../../../../components/AuthCard/AuthCard";
import FormField from "../../../../components/FormField/FormField";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";
import GoogleButton from "../../../../components/GoogleButton/GoogleButton";
import ModeToggle from "../../components/ModeToggle"; // ⬅️ new toggle

export default function Login() {
  const [mode, setMode] = useState("email"); // "email" | "username"
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);

  const usernameRe = /^[A-Za-z]{8,16}$/;
  const emailRe = /^\S+@\S+\.\S+$/;
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

      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      console.log(res)
      if (!res.ok) throw new Error("Login failed");
      window.location.href = "/Dashboard";
    } catch (e) {
      setErr({ api: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome Back 👋"
      subtitle="Sign in to find the cheapest shopping near you."
      icon="🛒"
    >
      {/* Mode Toggle (email | username) */}
      <ModeToggle mode={mode} onChange={setMode} />

      {err.api && <div className="error" role="alert">{err.api}</div>}

      <form onSubmit={onSubmit} noValidate>
        {mode === "email" && (
          <FormField id="email" label="Email" error={err.email}>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={onChange}
              aria-invalid={!!err.email}
              autoComplete="email"
            />
          </FormField>
        )}

        {mode === "username" && (
          <FormField id="username" label="Username" error={err.username}>
            <input
              id="username"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={onChange}
              aria-invalid={!!err.username}
              autoComplete="username"
            />
          </FormField>
        )}

        <FormField id="pw" label="Password" error={err.password}>
          <PasswordInput
            id="pw"
            name="password"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </FormField>

        <Button variant="primary" fullWidth type="submit" loading={loading}>
          Login
        </Button>
      </form>

      {/* Google OAuth button */}
      <GoogleButton onClick={() => (window.location.href = "https://accounts.google.com/")} />

      <div className="split">
        <a href="/register">Sign up!</a>
        <a href="/reset">Forgot Password?</a>
      </div>

      <p className="footer-note">Cheapest Shopping List Near Me</p>
    </AuthCard>
  );
}
