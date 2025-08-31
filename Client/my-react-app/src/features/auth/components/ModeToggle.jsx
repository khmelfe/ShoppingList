// src/features/auth/components/ModeToggle.jsx
import "../../../styles/ModeToggle.css"; // new CSS file for ModeToggle

export default function ModeToggle({ mode, onChange }) {
  return (
    <div className="mode-toggle">
      <label>
        <input
          type="radio"
          name="mode"
          value="email"
          checked={mode === "email"}
          onChange={() => onChange("email")}
        />
        Sign in with Email
      </label>
      <label>
        <input
          type="radio"
          name="mode"
          value="username"
          checked={mode === "username"}
          onChange={() => onChange("username")}
        />
        Sign in with Username
      </label>
    </div>
  );
}
