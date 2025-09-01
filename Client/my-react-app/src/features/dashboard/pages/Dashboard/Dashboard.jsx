import React from "react";
import { Link } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PaidIcon from "@mui/icons-material/Paid";
import SavingsIcon from "@mui/icons-material/Savings";

import LocationBanner from "../../components/LocationBanner/LocationBanner";
import Stat from "../../components/Stat/Stat";
import QuickActions, { QAItem } from "../../components/QuickActions/QuickActions";
import LastShoppingList from "../../components/LastShoppingList/LastShoppingList";
import ExpensesChart from "../../components/ExpensesChart/ExpensesChart";
import RecurringPurchases from "../../components/RecurringPurchases/RecurringPurchases";
import SavingsGoal from "../../components/SavingsGoal/SavingsGoal";

import "./dashboard.css";

/* mock data */
const stats = {
  totalSpentLastMonth: 1248.9,
  mostUsedShop: "Super-Sal Dizengoff",
  moneySaved: 186.4,
  savedDeltaPct: +12.3,
  spentDeltaPct: -4.8,
};

const expensesSeries = [
  { label: "W1", value: 320 },
  { label: "W2", value: 275 },
  { label: "W3", value: 410 },
  { label: "W4", value: 243 },
];

const recurringPredictions = [
  { id: "milk-1l", name: "Milk 1L", lastBought: "13 days ago", usualPrice: 5.9 },
  { id: "eggs-12", name: "Eggs (12)", lastBought: "15 days ago", usualPrice: 12.5 },
  { id: "bread", name: "Whole Wheat Bread", lastBought: "12 days ago", usualPrice: 8.9 },
];

const savingsGoal = { monthlyTarget: 250 };
const savedThisMonth = 186;

export default function Dashboard() {
  const quickAdd = (id) => console.log("Quick-add:", id);

  return (
    <section className="dash">
      <LocationBanner />

      <div className="stats-grid">
        <Stat
          icon={<PaidIcon />}
          title="Total Spent (Last Month)"
          value={`₪${stats.totalSpentLastMonth.toFixed(0)}`}
          extra={`${stats.spentDeltaPct > 0 ? "+" : ""}${stats.spentDeltaPct}%`}
          extraNegative={stats.spentDeltaPct > 0}
        />
        <Stat icon={<LocalMallIcon />} title="Most Used Shop" value={stats.mostUsedShop} extra="Frequent" />
        <Stat
          icon={<SavingsIcon />}
          title="Money Saved"
          value={`₪${stats.moneySaved.toFixed(0)}`}
          extra={`${stats.savedDeltaPct > 0 ? "+" : ""}${stats.savedDeltaPct}%`}
        />
      </div>

      <div className="dash-grid-2">
        <LastShoppingList />

        <QuickActions>
          <QAItem to="/shop" icon={<StorefrontIcon />} label="Find Cheapest Near Me" />
          <QAItem to="/compare" icon={<BarChartIcon />} label="Compare Prices" />
          <QAItem to="/favorites" icon={<FavoriteIcon />} label="Favorite Carts" />
        </QuickActions>

        <ExpensesChart data={expensesSeries} />

        <div className="card">
          <h2 className="card-title">Suggested Picks</h2>
          <div className="placeholder">Add logic later.</div>
        </div>

        <RecurringPurchases items={recurringPredictions} onQuickAdd={quickAdd} />

        <SavingsGoal savedThisMonth={savedThisMonth} monthlyTarget={savingsGoal.monthlyTarget} />
      </div>
    </section>
  );
}
