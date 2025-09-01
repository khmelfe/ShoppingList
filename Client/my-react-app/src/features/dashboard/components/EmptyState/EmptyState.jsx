import React from "react";
import styles from "./empty-state.module.css";

export default function EmptyState({ icon = "ℹ️", title, subtitle, action }) {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>{icon}</div>
      {title && <div className={styles.emptyMain}>{title}</div>}
      {subtitle && <div className={styles.emptySub}>{subtitle}</div>}
      {action}
    </div>
  );
}
