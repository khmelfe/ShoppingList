import { useMemo, useState } from "react";
import PRODUCTS from "../data/mockProducts";

const mapIdToFilter = (id) => {
  if (id === "all") return "All";
  const map = {
    produce: "Produce",
    bakery: "Bakery",
    dairy: "Dairy",
    frozen: "Frozen",
    meatfish: "Meat & Fish",
    snacks: "Snacks",
    drinks: "Drinks",
    household: "Household",
  };
  return map[id] ?? "All";
};

export default function useProducts() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "category") list.sort((a, b) => a.category.localeCompare(b.category));
    return list;
  }, [query, category, sort]);

  return { query, setQuery, category, setCategory, sort, setSort, filtered, mapIdToFilter };
}
