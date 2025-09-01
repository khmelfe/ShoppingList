import React from "react";
import "./Button.css";

/**
 * Reusable Button
 * Props:
 *  - variant: "primary" | "secondary" | "google"
 *  - fullWidth?: boolean
 *  - loading?: boolean
 *  - leftIcon?: ReactNode
 *  - rightIcon?: ReactNode
 *  - className?: string (extra classes)
 *  - ...rest button props
 */
export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...rest
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    fullWidth ? "btn-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={loading || disabled}
      {...rest}
    >
      {leftIcon ? <span className="btn-icon">{leftIcon}</span> : null}
      <span className="btn-label">{loading ? "Loading..." : children}</span>
      {rightIcon ? <span className="btn-icon">{rightIcon}</span> : null}
    </button>
  );
}
