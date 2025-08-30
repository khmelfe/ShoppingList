// src/components/AuthCard.jsx
import React from "react";
import "./auth-card.css";

/**
 * AuthCard: shared wrapper for auth pages
 * Props:
 *  - title?: string
 *  - subtitle?: string
 *  - icon?: ReactNode (e.g., "🛒")
 *  - children: form/content
 */
export default function AuthCard({ title, subtitle, icon, children }) {
  return (
    <div className="auth-card">
      {icon && <div className="brand-icon" aria-hidden>{icon}</div>}
      {title && <h2 className="title">{title}</h2>}
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {children}
    </div>
  );
}
