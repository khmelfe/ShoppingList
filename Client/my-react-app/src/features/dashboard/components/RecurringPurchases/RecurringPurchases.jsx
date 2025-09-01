import React from "react";
import { Link } from "react-router-dom";
import RestoreIcon from "@mui/icons-material/Restore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "../_shared/card.css";
import styles from "./recurring-purchases.module.css";

export default function RecurringPurchases({ items = [], onQuickAdd }) {
  return (
    <div className="card">
      <div className="card-top">
        <div className="card-icon">
          <RestoreIcon style={{ fontSize: 28 }} />
        </div>
        <h2 className="card-title">Recurring Purchases</h2>
      </div>

      {items.length === 0 ? (
        <p className={styles.muted}>No recurring items yet. We’ll learn from your next few lists.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((it) => (
            <li className={styles.row} key={it.id}>
              <div className={styles.main}>
                <span className={styles.name}>{it.name}</span>
                <span className={styles.sub}>Last bought {it.lastBought} · ~₪{it.usualPrice}</span>
              </div>
              <button className={styles.ghostBtn} onClick={() => onQuickAdd?.(it.id)}>
                <AddShoppingCartIcon fontSize="small" />
                <span>Add</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.rowEnd}>
        <Link to="/settings/recurring" className={styles.link}>Manage suggestions</Link>
      </div>
    </div>
  );
}
