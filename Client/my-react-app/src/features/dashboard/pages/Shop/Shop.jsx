import React, { useState } from "react";
import {
  Badge,
  Box,
  Container,
  Drawer,
  Fab,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import CategoryBar from "./components/CategoryBar/CategoryBar";
import ProductCard from "./components/ProductCard/ProductCard";
import ProductDialog from "./components/ProductDialog/ProductDialog";
import CartSidebar from "./components/CartSidebar/CartSidebar";
import AnimatedSearchBar from "./components/AnimatedSearchBar/AnimatedSearchBar";

import useProducts from "./components/hooks/useProducts";
import useCart from "./components/hooks/useCart";
import usePendingFavoriteCart from "./components/hooks/usePendingFavoriteCart"; // ← NEW

import styles from "./Shop.module.css";

/**
 * Shop Page
 * - Centered header (title + subtitle)
 * - Search smaller and right-aligned under header
 * - Responsive product grid
 * - Cart as right sidebar on lg+, Drawer on mdDown
 */
export default function Shop() {
  // ——— Responsive flags
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md")); // mobile/tablet
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));     // desktop+

  // ——— Products: query/filter/sort
  const {
    query,
    setQuery,
    category,
    setCategory,
    sort,
    setSort,
    filtered,
    mapIdToFilter,
  } = useProducts();

  // ——— Cart
  const { cart, add, inc, dec, removeItem, clear } = useCart();

  // >>> Load pending Favorite (one-shot) <<<
  // Default behavior: replace the current cart. Change modeDefault to "append" if you prefer.
  usePendingFavoriteCart({ add, clear, modeDefault: "replace" }); // ← NEW

  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const itemCount = cart.reduce((s, it) => s + it.qty, 0);

  // ——— Demo actions
  const saveFavorites = () => alert(`Saved ${cart.length} item(s) to Favorites ✔`);
  const findCheapest = () => alert("Searching the cheapest near you for current cart…");

  return (
    <Box className={styles.page}>
      {/* Fluid container — docks left near sidebar on desktop */}
      <Container maxWidth={false} disableGutters className={styles.container}>
        <Grid container spacing={2}>
          {/* MAIN: full width on mdDown; 10/12 on lg+ */}
          <Grid item xs={12} lg={10}>
            <Paper elevation={1} className={styles.panel}>
              {/* ===== Header ===== */}
              <div className={styles.header}>
                {/* Left: Title + subtitle */}
                <div className={styles.headerHero}>
                  <h1 className={styles.title}>קנה &amp; חסוך</h1>
                  <span className={styles.subtitle}>
                    בחר קטגוריה, חפש והקלק על מוצר כדי לראות את כל המרכיבים והמידע התזונתי.
                  </span>
                </div>

                {/* Right: Controls (search + sort) */}
                <div className={styles.headerControls}>
                  <div className={styles.searchWrap}>
                    <AnimatedSearchBar
                      value={query}
                      onChange={(val) => setQuery(val)}
                      onSubmit={() => {/* optional: run filter now */}}
                      placeholder="חפש מוצרים…"
                      accentColor="#1976d2"
                    />
                  </div>

                  <div className={styles.sortWrap}>
                    <Select
                      size="small"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <MenuItem value="relevance">Relevance</MenuItem>
                      <MenuItem value="name">Name (A–Z)</MenuItem>
                      <MenuItem value="category">Category (A–Z)</MenuItem>
                    </Select>
                  </div>
                </div>

                {/* Divider */}
                <div className={styles.headerDivider} />
              </div>

              {/* ===== Categories ===== */}
              <CategoryBar
                value={category}
                onChange={(id) => setCategory(mapIdToFilter(id))}
              />

              {/* ===== Product Grid ===== */}
              <Box
                sx={{
                  mt: 1,
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  alignItems: "stretch",
                }}
              >
                {filtered.map((p) => (
                  <Box key={p.id} sx={{ minWidth: 0 }}>
                    <ProductCard product={p} onOpen={setSelected} onAdd={add} />
                  </Box>
                ))}

                {filtered.length === 0 && (
                  <Paper variant="outlined" className={styles.empty}>
                    <Typography>No products found.</Typography>
                  </Paper>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* CART: fixed sidebar on lg+; Drawer on mdDown */}
          {lgUp && (
            <Grid item xs={12} lg={2} className={styles.rightCol}>
              <CartSidebar
                items={cart}
                onInc={inc}
                onDec={dec}
                onRemove={removeItem}
                onClear={clear}
                onSaveFavorites={saveFavorites}
                onFindCheapest={findCheapest}
              />
            </Grid>
          )}
        </Grid>
      </Container>

      {/* ===== Mobile/Tablet: FAB + Drawer for Cart ===== */}
      {mdDown && (
        <>
          <Badge
            color="primary"
            badgeContent={itemCount}
            overlap="circular"
            invisible={itemCount === 0}
            sx={{ position: "fixed", right: 20, bottom: 20, zIndex: 1300 }}
          >
            <Fab
              color="primary"
              aria-label="Open cart"
              className={styles.fab}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCartIcon />
            </Fab>
          </Badge>

          <Drawer
            anchor="right"
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            PaperProps={{ sx: { width: { xs: "100%", sm: 420 } } }}
          >
            <Box sx={{ p: 2 }}>
              <CartSidebar
                items={cart}
                onInc={inc}
                onDec={dec}
                onRemove={removeItem}
                onClear={clear}
                onSaveFavorites={() => {
                  saveFavorites();
                  setCartOpen(false);
                }}
                onFindCheapest={() => {
                  findCheapest();
                  setCartOpen(false);
                }}
              />
            </Box>
          </Drawer>
        </>
      )}

      {/* ===== Product Details Dialog ===== */}
      <ProductDialog
        product={selected}
        onClose={() => setSelected(null)}
        onAdd={add}
      />
    </Box>
  );
}
