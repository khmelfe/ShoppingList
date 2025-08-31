import React from "react";
import "./../styles/dashboard.css";

import LocationBanner from "../components/LocationBanner";
import QuickActions from "../components/QuickActions";
import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";
import HistoryChart from "../components/HistoryChart";
import CartList from "../components/CartList";
import Button from "../../../components/Button";

export default function Dashboard() {
  // placeholder data—later wire to API/hooks
  const lastList = null;
  const lastMonth = { total: 0 };
  const cartItems = [];

  return (
    <div className="dash">
      {/* Top location banner */}
      <LocationBanner
        onEnable={() => console.log("enable geolocation")}
        onManual={() => (window.location.href = "/settings/location")}
      />

      {/* Quick actions */}
      <QuickActions />

      {/* Two-up: Last Shopping List + Last Month’s Expenses */}
      <div className="dash-grid-2">
        <StatCard
          icon="🧾"
          title="Last Shopping List"
          actions={<Button variant="secondary" onClick={() => {}}>Open</Button>}
        >
          {lastList ? (
            <div>Last list total: ₪{lastList.total}</div>
          ) : (
            <EmptyState
              icon="🧾"
              title="No recent purchases"
              subtitle="Create a list to get started."
              cta={<Button onClick={() => (window.location.href="/start-shopping")} variant="primary">Start a list</Button>}
            />
          )}
        </StatCard>

        <StatCard icon="📅" title="Last Month’s Expenses">
          <div style={{fontSize:28, fontWeight:800}}>₪{(lastMonth.total || 0).toFixed(2)}</div>
          {!lastMonth.total && <div className="muted">No expenses this month</div>}
        </StatCard>
      </div>

      {/* History chart block */}
      <StatCard icon="📈" title="Your Shopping History">
        <HistoryChart />
      </StatCard>

      {/* Cart list block */}
      <div className="dash-section">
        <h3 className="dash-h3">Your Shopping Cart List</h3>
        <p className="dash-sub">Compare prices across different supermarkets</p>
        <CartList items={cartItems} />
      </div>
    </div>
  );
}
