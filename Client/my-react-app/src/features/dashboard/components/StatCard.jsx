import React from "react";
import "../styles/statCard.css";

export default function StatCard({ icon, title, actions, children }) {
  return (
    <section className="stat-card">
      <header className="stat-card__header">
        <div className="stat-card__icon">{icon}</div>
        <h3 className="stat-card__title">{title}</h3>
        {actions ? <div className="stat-card__actions">{actions}</div> : null}
      </header>
      <div className="stat-card__body">{children}</div>
    </section>
  );
}
