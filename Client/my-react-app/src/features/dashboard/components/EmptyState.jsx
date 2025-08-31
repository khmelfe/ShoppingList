import React from "react";
import Button from "../../../components/Button";
import "../styles/emptyState.css";

export default function EmptyState({ icon="🛒", title, subtitle, cta }) {
  return (
    <div className="empty">
      <div className="empty__icon">{icon}</div>
      <h4 className="empty__title">{title}</h4>
      {subtitle ? <p className="empty__subtitle">{subtitle}</p> : null}
      {cta}
    </div>
  );
}
