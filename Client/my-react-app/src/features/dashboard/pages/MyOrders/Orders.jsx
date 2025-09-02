import React, { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import OrdersSearch from "./components/OrdersSearch/OrdersSearch";
import OrdersTable from "./components/OrdersTable/OrdersTable";
import { MOCK_ORDERS } from "./mockOrders";
import styles from "./orders.module.css";

// text search across fields + item names/barcodes
function matchesOrder(order, q) {
  if (!q) return true;
  const s = q.toLowerCase();
  const fields = [
    order.supermarket,
    order.location,
    order.city,
    order.date,
    ...order.items.flatMap((it) => [it.name, it.barcode]),
  ];
  return fields.some((f) => String(f).toLowerCase().includes(s));
}

export default function MyOrders() {
  const [query, setQuery] = useState("");
  const orders = useMemo(() => MOCK_ORDERS, []);
  const filtered = useMemo(() => orders.filter((o) => matchesOrder(o, query)), [orders, query]);

  return (
    <section className={styles.page}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Search by supermarket, city, location, date, item name, or barcode.
        </Typography>
      </Box>

      <Box sx={{ mb: 2, maxWidth: 420 }}>
        <OrdersSearch value={query} onChange={setQuery} />
      </Box>

      <OrdersTable orders={filtered} emptyMessage={`No orders match “${query}”.`} />
    </section>
  );
}
