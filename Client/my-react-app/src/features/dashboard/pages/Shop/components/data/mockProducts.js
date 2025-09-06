const PRODUCTS = [
  {
    id: "p5",
    name: "Milk 3% 1L",
    category: "Dairy",
    details: {
      ingredients: "Pasteurized milk 3% fat",
      allergens: "Milk (lactose)",
      origin: "Israel",
      unit: "1 L",
      nutrition: { energy: "61 kcal", protein: "3.2 g", carbs: "4.8 g", fat: "3.3 g" },
    },
  },
  {
    id: "p6",
    name: "Yogurt 500g",
    category: "Dairy",
    details: {
      ingredients: "Milk, live cultures",
      allergens: "Milk",
      origin: "Israel",
      unit: "500 g",
      nutrition: { energy: "59 kcal", protein: "10 g", carbs: "3.6 g", fat: "0.4 g" },
    },
  },
  {
    id: "p7",
    name: "Salmon Fillet 300g",
    category: "Meat & Fish",
    details: {
      ingredients: "Atlantic salmon fillet 100%",
      allergens: "Fish",
      origin: "Norway",
      unit: "300 g",
      nutrition: { energy: "208 kcal", protein: "20 g", carbs: "0 g", fat: "13 g" },
    },
  },

  // --- added 12 more items below ---

  {
    id: "p8",
    name: "Chicken Breast 1kg",
    category: "Meat & Fish",
    details: {
      ingredients: "Chicken breast 100%",
      allergens: "None",
      origin: "Israel",
      unit: "1 kg",
      nutrition: { energy: "165 kcal", protein: "31 g", carbs: "0 g", fat: "3.6 g" },
    },
  },
  {
    id: "p9",
    name: "Ice Cream 1L",
    category: "Frozen",
    details: {
      ingredients: "Milk, sugar, cream, emulsifiers, flavor",
      allergens: "Milk, may contain nuts",
      origin: "Israel",
      unit: "1 L",
      nutrition: { energy: "207 kcal", protein: "3.5 g", carbs: "24 g", fat: "11 g" },
    },
  },
  {
    id: "p10",
    name: "French Fries 1kg",
    category: "Frozen",
    details: {
      ingredients: "Potatoes, vegetable oil",
      allergens: "May contain traces of gluten",
      origin: "EU",
      unit: "1 kg",
      nutrition: { energy: "312 kcal", protein: "3.4 g", carbs: "41 g", fat: "15 g" },
    },
  },
  {
    id: "p11",
    name: "Cola 1.5L",
    category: "Drinks",
    details: {
      ingredients: "Water, sugar, color, acidity regulator, flavor, caffeine",
      allergens: "None",
      origin: "Israel",
      unit: "1.5 L",
      nutrition: { energy: "42 kcal", protein: "0 g", carbs: "10.6 g", fat: "0 g" },
    },
  },
  {
    id: "p12",
    name: "Sparkling Water 1.5L",
    category: "Drinks",
    details: {
      ingredients: "Carbonated water",
      allergens: "None",
      origin: "Israel",
      unit: "1.5 L",
      nutrition: { energy: "0 kcal", protein: "0 g", carbs: "0 g", fat: "0 g" },
    },
  },
  {
    id: "p13",
    name: "Potato Chips 150g",
    category: "Snacks",
    details: {
      ingredients: "Potatoes, vegetable oil, salt",
      allergens: "May contain milk",
      origin: "EU",
      unit: "150 g",
      nutrition: { energy: "536 kcal", protein: "7 g", carbs: "53 g", fat: "34 g" },
    },
  },
  {
    id: "p14",
    name: "White Bread 500g",
    category: "Bakery",
    details: {
      ingredients: "Wheat flour, water, yeast, sugar, salt",
      allergens: "Contains gluten",
      origin: "Israel",
      unit: "500 g",
      nutrition: { energy: "265 kcal", protein: "9 g", carbs: "49 g", fat: "3.2 g" },
    },
  },
  {
    id: "p15",
    name: "Whole Wheat Bread 500g",
    category: "Bakery",
    details: {
      ingredients: "Whole wheat flour, water, yeast, sugar, salt",
      allergens: "Contains gluten",
      origin: "Israel",
      unit: "500 g",
      nutrition: { energy: "247 kcal", protein: "13 g", carbs: "41 g", fat: "4.2 g" },
    },
  },
  {
    id: "p16",
    name: "Tomatoes 1kg",
    category: "Produce",
    details: {
      ingredients: "Tomatoes 100%",
      allergens: "None",
      origin: "Israel",
      unit: "1 kg",
      nutrition: { energy: "18 kcal", protein: "0.9 g", carbs: "3.9 g", fat: "0.2 g" },
    },
  },
  {
    id: "p17",
    name: "Cucumbers 1kg",
    category: "Produce",
    details: {
      ingredients: "Cucumbers 100%",
      allergens: "None",
      origin: "Israel",
      unit: "1 kg",
      nutrition: { energy: "15 kcal", protein: "0.7 g", carbs: "3.6 g", fat: "0.1 g" },
    },
  },
  {
    id: "p18",
    name: "Dish Soap 750ml",
    category: "Household",
    details: {
      ingredients: "Anionic and non-ionic surfactants, fragrance, color",
      allergens: "Irritant — not for consumption",
      origin: "Israel",
      unit: "750 ml",
      nutrition: null,
    },
  },
  {
    id: "p19",
    name: "Cheddar Cheese 200g",
    category: "Dairy",
    details: {
      ingredients: "Pasteurized milk, salt, cultures, rennet",
      allergens: "Milk",
      origin: "EU",
      unit: "200 g",
      nutrition: { energy: "403 kcal", protein: "25 g", carbs: "1.3 g", fat: "33 g" },
    },
  },
];

export default PRODUCTS;
