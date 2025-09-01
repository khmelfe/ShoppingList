import React from "react";
import { Link } from "react-router-dom";
import "../_shared/card.css";
import styles from "./quick-actions.module.css";

export function QAItem({ to, icon, label }) {
  return (
    <Link to={to} className={styles.qaItem}>
      <span className={styles.qaIcon}>{icon}</span>
      <span className={styles.qaLabel}>{label}</span>
    </Link>
  );
}

export default function QuickActions({ title = "Quick Actions", children }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className={styles.qaGrid}>{children}</div>
    </div>
  );
}
