import React from "react";
import { Box, ButtonBase, Typography, alpha, useTheme } from "@mui/material";
import styles from "./CategoryBar.module.css";

// Icons
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import EggAltIcon from "@mui/icons-material/EggAlt";
import IcecreamIcon from "@mui/icons-material/Icecream";
import SetMealIcon from "@mui/icons-material/SetMeal";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

export const CATEGORY_ITEMS = [
  { id: "all", label: "All", icon: LocalMallIcon },
  { id: "produce", label: "Produce", icon: LocalGroceryStoreIcon },
  { id: "bakery", label: "Bakery", icon: BakeryDiningIcon },
  { id: "dairy", label: "Dairy", icon: EggAltIcon },
  { id: "frozen", label: "Frozen", icon: IcecreamIcon },
  { id: "meatfish", label: "Meat & Fish", icon: SetMealIcon },
  { id: "snacks", label: "Snacks", icon: LunchDiningIcon },
  { id: "drinks", label: "Drinks", icon: LocalDrinkIcon },
  { id: "household", label: "Household", icon: CleaningServicesIcon },
];

export default function CategoryBar({ value, onChange, items = CATEGORY_ITEMS }) {
  const theme = useTheme();
  const blue1 = "#3b60e4";
  const blue2 = "#2f4cc2";
  const accent = "#ffd645";

  return (
    <Box
      role="tablist"
      aria-label="Shop categories"
      className={styles.categoryBar}
      sx={{
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(theme.palette.text.primary, 0.2),
        },
      }}
    >
      {items.map(({ id, label, icon: Icon }) => {
        const active = (value === "All" && id === "all") || value === label || value === id;
        return (
          <ButtonBase
            key={id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange?.(id)}
            className={`${styles.categoryCard} ${active ? styles.active : ""}`}
            sx={{
              background: `linear-gradient(180deg, ${blue1} 0%, ${blue2} 100%)`,
              color: accent,
              border: (t) =>
                active ? `2px solid ${accent}` : `1px solid rgba(0,0,0,.08)`,
            }}
          >
            <Icon fontSize="medium" className={styles.categoryIcon} />
            <Typography variant="caption" className={styles.categoryLabel}>
              {label}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
