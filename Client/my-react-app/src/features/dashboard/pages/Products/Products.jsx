// Client/my-react-app/src/features/dashboard/pages/Products/Products.jsx
import React, { useMemo, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";

import SearchBar from "./components/SearchBar/SearchBar";
import ProductsTable from "./components/ProductsTable/ProductsTable";
import EmptyResult from "./components/EmptyResult/EmptyResult";

// -- helpers & mock data --
function createProduct(name, brand, category, store, price, barcode, image, history = []) {
  return {
    id: `${name}-${brand}`.toLowerCase().replace(/\s+/g, "-"),
    name,
    brand,
    category,
    store,     // used in history
    price,
    barcode,
    image,     // NEW: optional preview url
    history,   // [{date:'YYYY-MM-DD', store:'Name', price:number}]
  };
}

const PRODUCTS = [
  createProduct(
    "Milk 1L", "Tara", "Dairy", "Super-Sal Dizengoff", 5.9, "7290000010013",
    "https://via.placeholder.com/160x160.png?text=Milk",
    [
      { date: "2025-08-30", store: "Super-Sal Dizengoff", price: 5.9 },
      { date: "2025-08-22", store: "Rami Levy",          price: 5.7 },
    ]
  ),
  createProduct(
    "Eggs (12)", "Yoad", "Dairy", "Rami Levy", 12.5, "7290000010020",
    "https://via.placeholder.com/160x160.png?text=Eggs",
    [
      { date: "2025-08-29", store: "Rami Levy",   price: 12.5 },
      { date: "2025-08-20", store: "Yochananof", price: 12.9 },
    ]
  ),
  createProduct(
    "Whole Wheat Bread", "Angel", "Bakery", "Shufersal Online", 8.9, "7290000010037",
    "https://via.placeholder.com/160x160.png?text=Bread",
    [
      { date: "2025-08-27", store: "Shufersal Online", price: 8.9 },
      { date: "2025-08-18", store: "Victory TLV",      price: 9.2 },
    ]
  ),
  createProduct(
    "Tomatoes 500g", "Local Farm", "Produce", "Victory TLV", 6.2, "7290000010044",
    "https://via.placeholder.com/160x160.png?text=Tomatoes",
    [
      { date: "2025-08-25", store: "Victory TLV",         price: 6.2 },
      { date: "2025-08-17", store: "Super-Sal Dizengoff", price: 6.5 },
    ]
  ),
  createProduct(
    "Basmati Rice 1kg", "Osem", "Pantry", "Yochananof", 14.9, "7290000010051",
    "https://via.placeholder.com/160x160.png?text=Rice",
    [{ date: "2025-08-28", store: "Yochananof", price: 14.9 }]
  ),
];

export default function Products() {
  const [query, setQuery] = useState("");

  // search name/brand/category
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) =>
      [p.name, p.brand, p.category].some((v) => v.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <Box sx={{ p: 1 }}>
      <Paper elevation={1} sx={{ p: 2, borderRadius: 2, boxShadow: "0 1px 3px rgba(16,24,40,.06)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", justifyContent: "space-between", mb: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#0b3a50" }}>Products</Typography>
          <SearchBar value={query} onChange={setQuery} />
        </Box>

        <Typography variant="body2" sx={{ color: "#64748b", mb: 1 }}>
          <b style={{ color: "#0b3a50" }}>{filtered.length}</b> {filtered.length === 1 ? "result" : "results"} ·
          <span style={{ marginLeft: 8 }}>Try “milk”, “Angel”, or “Dairy”.</span>
        </Typography>

        {filtered.length === 0 ? <EmptyResult query={query} /> : <ProductsTable rows={filtered} query={query} />}
      </Paper>
    </Box>
  );
}
