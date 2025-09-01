import React from "react";
import { Link } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../_shared/card.css";
import styles from "./last-shopping-list.module.css";
import EmptyState from "../EmptyState/EmptyState";

export default function LastShoppingList() {
  return (
    <div className="card">
      <div className="card-top">
        <div className="card-icon">
          <ReceiptLongIcon style={{ fontSize: 28 }} />
        </div>
        <h2 className="card-title">Last Shopping List</h2>
      </div>

      <EmptyState
        icon="🧾"
        title="No recent purchases"
        subtitle="Create a list to get started."
        action={
          <Link to="/shop" className={styles.btnPrimary}>
            <ShoppingCartIcon style={{ fontSize: 18 }} />
            Start a list
          </Link>
        }
      />
    </div>
  );
}
