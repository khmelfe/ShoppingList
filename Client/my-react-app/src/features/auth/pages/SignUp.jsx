// src/features/auth/pages/SignUp.jsx
import { useState } from "react";


import AuthCard from "../../../components/AuthCard";
import FormField from "../../../components/FormField";
import PasswordInput from "../../../components/PasswordInput";
import LocationInput from "../components/LocationInput";
import Button from "../../../components/Button";
import GoogleButton from "../../../components/GoogleButton";

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
    lat: null,
    lon: null,
  });
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);

  // validation rules
  const usernameRe = /^[A-Za-z]{8,16}$/;                      // 8–16 letters
  const emailRe = /^\S+@\S+\.\S+$/;                           // basic email
  const passwordRe = /^(?=.*[A-Z])(?=.*[@!?])[A-Za-z0-9@!?]{8,16}$/; // 8–16, 1 upper, 1 special

  const validate = () => {
    const e = {};
    if (!usernameRe.test(form.username)) {
      e.username = "Username must be 8–16 letters (A–Z only).";
    }
    if (!emailRe.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!passwordRe.test(form.password)) {
      e.password = "Password 8–16 chars, ≥1 uppercase, ≥1 special (@, !, ?).";
    }
    if (!form.location) {
      e.location = "Location is required.";
    }
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Registration failed");
      window.location.href = "/login";
    } catch (e) {
      setErr({ api: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create Account ✨"
      subtitle="Join us to start saving on your shopping list."
      icon="🛒"
    >
      {err.api && <div className="error" role="alert">{err.api}</div>}

      <form onSubmit={onSubmit} noValidate>
        <FormField id="username" label="Username" error={err.username}>
          <input
            id="username"
            name="username"
            placeholder="Enter a username"
            value={form.username}
            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
            aria-invalid={!!err.username}
            autoComplete="username"
          />
        </FormField>

        <FormField id="email" label="Email" error={err.email}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            aria-invalid={!!err.email}
            autoComplete="email"
          />
        </FormField>

        <FormField id="pw" label="Password" error={err.password}>
          <PasswordInput
            id="pw"
            name="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            placeholder="Choose a strong password"
            autoComplete="new-password"
            aria-invalid={!!err.password}
          />
        </FormField>

        <FormField id="location" label="Location" error={err.location}>
          <LocationInput
            value={form.location}
            onChange={(v) => setForm((f) => ({ ...f, location: v }))}
            lat={form.lat}
            lon={form.lon}
            onCoordsChange={({ lat, lon }) =>
              setForm((f) => ({ ...f, lat, lon }))
            }
            showPreview
          />
        </FormField>

        <Button variant="primary" fullWidth type="submit" loading={loading} disabled={loading}>
          Sign Up
        </Button>
      </form>

      <GoogleButton onClick={() => (window.location.href = "https://accounts.google.com/")} />

      <div className="split">
        <a href="/login">Already have an account? Login</a>
      </div>

      <p className="footer-note">Cheapest Shopping List Near Me</p>
    </AuthCard>
  );
}
