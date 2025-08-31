import React from "react";
import "../styles/quickActions.css";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ExploreIcon from "@mui/icons-material/Explore";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';

const items = [
  { icon: ShoppingCartCheckoutSharpIcon, title: "Create Cart", href: "/saved-carts" },
  { icon: ExploreIcon, title: "Find Cheapest Near Me", href: "/finder" },
  { icon: BarChartIcon, title: "Compare Prices", href: "/compare" },
  { icon: FavoriteIcon, title: "View Favorites", href: "/favorites" },
];

export default function QuickActions() {
  return (
    <div className="qa-grid">
      {items.map((it) => {
        const Icon = it.icon; // grab the component
        return (
          <a key={it.title} className="qa-item" href={it.href}>
            <div className="qa-icon">
              <Icon /> {/* render it properly */}
            </div>
            <div className="qa-title">{it.title}</div>
          </a>
        );
      })}
    </div>
  );
}
