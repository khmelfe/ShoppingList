import React from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import "../_shared/card.css";
import styles from "./savings-goal.module.css";

export default function SavingsGoal({ savedThisMonth, monthlyTarget }) {
  const pct = Math.min(100, Math.round((savedThisMonth / Math.max(1, monthlyTarget)) * 100));

  return (
    <div className="card">
      <div className="card-top">
        <div className="card-icon">
          <SavingsIcon style={{ fontSize: 28 }} />
        </div>
        <h2 className="card-title">Savings Goal</h2>
      </div>

      <div className={styles.stats}>
        <div className={styles.nums}>
          <span className={styles.amount}>₪{savedThisMonth}</span>
          <span className={styles.target}>of ₪{monthlyTarget}</span>
        </div>

        <div className={styles.progress} aria-label={`Savings progress ${pct}%`}>
          <div className={styles.bar} style={{ width: `${pct}%` }} />
        </div>

        <div className={styles.foot}>
          {pct >= 100 ? (
            <span className={styles.success}>
              <CheckCircleIcon fontSize="small" /> Goal reached — amazing!
            </span>
          ) : (
            <span className={styles.muted}>{100 - pct}% to go this month</span>
          )}
          <Link to="/settings/goals" className={styles.link}>Edit goal</Link>
        </div>
      </div>
    </div>
  );
}
