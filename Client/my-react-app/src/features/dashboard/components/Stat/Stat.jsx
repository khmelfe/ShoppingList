import React from "react";
import styles from "./stat.module.css";

export default function Stat({ icon, title, value, extra, extraNegative }) {
  return (
    <div className={styles.stat}>
      <div className={styles.icon}>{icon}</div>
      <div>
        <p className={styles.title}>{title}</p>
        <div className={styles.value}>{value}</div>
      </div>
      {extra && (
        <div className={`${styles.extra} ${extraNegative ? styles.negative : ""}`}>
          {extra}
        </div>
      )}
    </div>
  );
}
