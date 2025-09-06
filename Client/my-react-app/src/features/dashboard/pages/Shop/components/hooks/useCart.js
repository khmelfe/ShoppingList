import { useState, useCallback } from "react";

export default function useCart(initial = []) {
  const [cart, setCart] = useState(initial);

  const add = useCallback((product) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { id: product.id, name: product.name, qty: 1 }];
    });
  }, []);

  const inc = useCallback((id) => setCart((p) => p.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))), []);
  const dec = useCallback((id) =>
    setCart((p) =>
      p
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
        .filter((i) => i.qty > 0)
    ), []);
  const removeItem = useCallback((id) => setCart((p) => p.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setCart([]), []);

  return { cart, add, inc, dec, removeItem, clear };
}
