import React from "react";
import EmptyState from "./EmptyState";
import Button from "../../../components/Button";
import "../styles/cartList.css";

export default function CartList({ items = [] }) {
  if (!items.length) {
    return (
      <div className="cartlist">
        <EmptyState
          icon="🛍️"
          title="Your cart is empty"
          subtitle="Add items to your cart to compare prices across supermarkets."
          cta={
            <div style={{display:"flex", gap:10, justifyContent:"center"}}>
              <Button onClick={() => (window.location.href="/start-shopping")} variant="primary">
                Start Shopping
              </Button>
              <Button onClick={() => (window.location.href="/saved-carts")} variant="secondary">
                View Saved Carts
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="cartlist">
      {/* render list rows here */}
      {items.map((it) => (
        <div key={it.id} className="cartlist__row">
          <div>{it.name}</div>
          <div>{it.qty}</div>
          <div>{it.price}</div>
        </div>
      ))}
    </div>
  );
}
