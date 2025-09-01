import React from "react";
import "./GoogleButton.css";

// Reusable Google button
export default function GoogleButton({ children = "Continue with Google", onClick }) {
  return (
    <button className="google-btn" type="button" onClick={onClick}>
      <GoogleIcon />
      <span>{children}</span>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.98 2.38 30.47 0 
        24 0 14.64 0 6.45 5.48 2.56 13.44l7.98 6.19C12.19 
        13.09 17.68 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.61-.15-3.16-.42-4.66H24v9.12h12.7c-.55 
        2.82-2.2 5.2-4.7 6.8l7.27 5.64C43.73 
        37.18 46.5 31.3 46.5 24.5z"
      />
      <path
        fill="#FBBC05"
        d="M10.54 28.64A13.49 13.49 0 0 1 9.5 
        24c0-1.64.28-3.22.79-4.64l-7.98-6.19A23.88 
        23.88 0 0 0 0 24c0 3.86.93 7.52 
        2.56 10.84l7.98-6.2z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 
        15.9-5.81l-7.27-5.64c-2.02 
        1.36-4.62 2.17-8.63 
        2.17-6.32 0-11.81-3.59-13.92-8.94l-7.98 
        6.2C6.45 42.52 14.64 48 24 48z"
      />
    </svg>
  );
}
