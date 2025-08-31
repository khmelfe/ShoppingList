import React from "react";
import "../styles/quickActions.css";

const items = [
  { icon: "🔖", title: "Saved Carts", href: "/saved-carts" },
  { icon: "🧭", title: "Find Cheapest Near Me", href: "/finder" },
  { icon: "📊", title: "Compare Prices", href: "/compare" },
  { icon: "💚", title: "View Favorites", href: "/favorites" },
];

export default function QuickActions() {
  return (
    <div className="qa-grid">
      {items.map((it) => (
        <a key={it.title} className="qa-item" href={it.href}>
          <div className="qa-icon">{it.icon}</div>
          <div className="qa-title">{it.title}</div>
        </a>
      ))}
    </div>
  );
}
