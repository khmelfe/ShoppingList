// One-shot loader for a Favorite cart selected on the Favorites page.
// Reads __pending_favorite_cart from localStorage, applies it, then clears it.
import React from "react";
const PENDING_KEY = "__pending_favorite_cart";

function takePendingFavorite() {
  const raw = localStorage.getItem(PENDING_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    localStorage.removeItem(PENDING_KEY); // one-time
    return data && typeof data === "object" ? data : null;
  } catch {
    localStorage.removeItem(PENDING_KEY);
    return null;
  }
}

// Tries calling add(product, qty). If your add() only accepts (product),
// it falls back to calling add() repeatedly.
function safeAdd(add, product, qty) {
  try {
    const maybe = add(product, qty);
    // if your add supports qty, we're good
    return maybe;
  } catch {
    // fallback: add qty times
    const n = Math.max(1, Number(qty) || 1);
    for (let i = 0; i < n; i++) add(product);
  }
}

export default function usePendingFavoriteCart({ add, clear, modeDefault = "replace" }) {
  // NOTE: we keep it dependency-free on purpose so it runs once on mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    const pending = takePendingFavorite();
    if (!pending || !Array.isArray(pending.items)) return;

    const mode = (pending.mode === "append" || pending.mode === "replace")
      ? pending.mode
      : modeDefault;

    if (mode === "replace" && typeof clear === "function") {
      clear();
    }

    for (const it of pending.items) {
      // Map minimal product shape expected by your app
      const product = {
        id: it.id,
        name: it.name,
        // Add more fields if your ProductCard/add() expects them (price, store, etc.)
      };
      const qty = Number(it.qty) || 1;
      safeAdd(add, product, qty);
    }

    // Optional: you can show a toast/banner here if you have one:
    // enqueueSnackbar(`Loaded favorite: ${pending.name}`, { variant: "info" });
  }, []);
}
