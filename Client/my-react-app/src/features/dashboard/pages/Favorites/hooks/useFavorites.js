import { useMemo } from "react";
import data from "../data/favorites.mock";

export default function useFavorites() {
  const favorites = useMemo(() => data, []);
  const getById = (id) => favorites.find((f) => f.id === id);
  return { favorites, getById };
}
