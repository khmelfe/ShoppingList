// helpers & mock data (kept in one place so you can swap to DB later)
export const ILS = new Intl.NumberFormat("he-IL", {
  style: "currency",
  currency: "ILS",
  maximumFractionDigits: 2,
});

export function createOrder({ id, supermarket, location, city, date, items }) {
  const total = items.reduce((s, it) => s + it.qty * it.unitPrice, 0);
  return { id, supermarket, location, city, date, items, total };
}

export const MOCK_ORDERS = [
  createOrder({
    id: "ord-001",
    supermarket: "Rami Levy",
    location: "Rami Levy Big Be'er Sheva",
    city: "Be'er Sheva",
    date: "2025-08-30",
    items: [
      { name: "Milk 1L (Tara)", barcode: "7290000010013", qty: 2, unitPrice: 5.9 },
      { name: "Eggs (12)", barcode: "7290000010020", qty: 1, unitPrice: 12.5 },
      { name: "Tomatoes 500g", barcode: "7290000010044", qty: 1, unitPrice: 6.2 },
    ],
  }),
  createOrder({
    id: "ord-002",
    supermarket: "Super-Sal Dizengoff",
    location: "Super-Sal, Dizengoff Center",
    city: "Tel Aviv",
    date: "2025-08-22",
    items: [
      { name: "Whole Wheat Bread (Angel)", barcode: "7290000010037", qty: 1, unitPrice: 8.9 },
      { name: "Basmati Rice 1kg (Osem)", barcode: "7290000010051", qty: 1, unitPrice: 14.9 },
    ],
  }),
];
