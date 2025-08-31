// src/components/FormField.jsx

import React from "react";
import "./FormField.css";

/**
 * FormField Component
 *
 * Props:
 *  - label: string
 *  - id: string
 *  - error?: string
 *  - children: input or custom field
 */



export default function FormField({ id, label, error, children }) {
  // Clone the child element(s) and inject the `className="input"`
  const childWithClass = Array.isArray(children)
    ? children.map((child) =>
        child && child.type
          ? { ...child, props: { ...child.props, className: (child.props.className || "") + " input" } }
          : child
      )
    : children && children.type
    ? { ...children, props: { ...children.props, className: (children.props.className || "") + " input" } }
    : children;

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <div className="form-input">
        {childWithClass}
      </div>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}
