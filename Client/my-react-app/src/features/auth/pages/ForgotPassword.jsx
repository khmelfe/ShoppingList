import { useState } from "react";

import AuthCard from "../../../components/AuthCard";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import GoogleButton from "../../../components/GoogleButton";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailRe = /^\S+@\S+\.\S+$/;

  const validate = () => {
    if (!emailRe.test(email)) {
      setErr("Enter a valid email address.");
      return false;
    }
    setErr("");
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // 🔗 Call your backend
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSuccess(true);
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Forgot Password 🔑"
      subtitle="Enter your email to reset your password."
      icon="🛒"
    >
      {success ? (
        <p style={{ textAlign: "center", color: "green" }}>
          If an account exists, a reset link has been sent to {email}.
        </p>
      ) : (
        <>
          <form onSubmit={onSubmit} noValidate>
            <FormField id="email" label="Email" error={err}>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </FormField>

            <Button variant="primary" fullWidth type="submit" loading={loading}>
              Send Reset Link
            </Button>
          </form>

          {/* Google OAuth option */}
          <GoogleButton
            onClick={() => (window.location.href = "https://myaccount.google.com/")}
          />
        </>
      )}

      <div className="split">
        <a href="/login">Back to Login</a>
      </div>
    </AuthCard>
  );
}
