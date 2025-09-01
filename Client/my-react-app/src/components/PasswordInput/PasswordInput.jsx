import React, { useState } from "react";
import "./PasswordInput.css";

/**
 * PasswordInput
 * Props:
 *  - id (string)            required for label/aria
 *  - name (string)          e.g. "password"
 *  - value (string)
 *  - onChange (fn)          (e) => void
 *  - placeholder (string)
 *  - error (string)         (optional) if you're also passing error into FormField, this can be omitted
 *  - autoComplete (string)  e.g. "current-password" | "new-password"
 *  - required, disabled, onBlur, className  (optional passthrough)
 */
export default function PasswordInput({ value, onChange, ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div className="password-input">
      <input
        {...props}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
}
