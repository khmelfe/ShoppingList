const favorites = [
  {
    id: "fav-001",
    name: "Usual Weekly",
    items: 23,
    tags: ["Family", "Veggies"],
    updatedAt: "2025-09-03",
    pinned: true,
    products: [
      { id: "p1", name: "Tomatoes", qty: 3 },
      { id: "p2", name: "Milk 3%", qty: 2 },
      { id: "p3", name: "Eggs (12)", qty: 1 },
      { id: "p4", name: "Cucumbers", qty: 4 },
      { id: "p5", name: "Pita Bread", qty: 2 },
      { id: "p6", name: "Rice 1kg", qty: 1 },
      { id: "p7", name: "Olive Oil", qty: 1 },
    ],
  },
  {
    id: "fav-002",
    name: "Date Night",
    items: 9,
    tags: ["Pasta", "Wine"],
    updatedAt: "2025-08-28",
    pinned: false,
    products: [
      { id: "p8", name: "Spaghetti", qty: 2 },
      { id: "p9", name: "Tomato Sauce", qty: 2 },
      { id: "p10", name: "Parmesan", qty: 1 },
      { id: "p11", name: "Red Wine", qty: 1 },
      { id: "p12", name: "Garlic", qty: 1 },
    ],
  },
  {
    id: "fav-003",
    name: "Friends Are Coming",
    items: 17,
    tags: ["Party"],
    updatedAt: "2025-08-15",
    pinned: false,
    products: [
      { id: "p13", name: "Cola 1.5L", qty: 4 },
      { id: "p14", name: "Chips", qty: 5 },
      { id: "p15", name: "Hummus", qty: 2 },
      { id: "p16", name: "Chicken Wings", qty: 3 },
      { id: "p17", name: "Salad Mix", qty: 2 },
      { id: "p18", name: "Pita Bread", qty: 3 },
    ],
  },
];

export default favorites;
