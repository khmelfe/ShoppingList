import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import styles from "./favorites.module.css";

export const PENDING_FAVORITE_KEY = "__pending_favorite_cart";

/* Blank placeholder image (SVG data-URI) */
const BLANK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'>
      <rect width='100%' height='100%' rx='12' ry='12' fill='#f5f7fa'/>
      <path d='M24 48h48M48 24v48' stroke='#c5ccd6' stroke-width='6' stroke-linecap='round'/>
    </svg>`
  );

/* Demo data — replace with your source */
const mockFavorites = [
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

export default function Favorites() {
  const navigate = useNavigate();
  const favorites = useMemo(() => mockFavorites, []);

  const goToShopWithCart = (favId) => {
    const fav = favorites.find((f) => f.id === favId);
    if (fav) {
      localStorage.setItem(
        PENDING_FAVORITE_KEY,
        JSON.stringify({
          id: fav.id,
          name: fav.name,
          items: fav.products || [], // [{id, name, qty}]
          mode: "replace",
          ts: Date.now(),
        })
      );
    }
    navigate(`/dashboard/shop?cart=${encodeURIComponent(favId)}`);
  };

  return (
    <Box className={styles.page}>
      <Box className={styles.header}>
        <Typography variant="h5" className={styles.title}>Favorites</Typography>
        <Typography variant="body2" color="text.secondary">
          Click a card to open it in the shop.
        </Typography>
      </Box>

      {/* ---- ROW 1: centered "New Favorite" ---- */}
      <div className={styles.newRow}>
        <Card className={`${styles.card} ${styles.addCard} ${styles.addCardFull}`} elevation={0}>
          <CardActionArea onClick={() => navigate("/dashboard/shop")}>
            <CardContent className={styles.addCardContent}>
              <AddCircleOutlineIcon className={styles.addIcon} />
              <Typography variant="subtitle1">New Favorite</Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Start a cart and save it for later
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>

      {/* ---- ROW 2+: saved favorites in 1→2→3→4→5 grid ---- */}
      {favorites.length === 0 ? (
        <Typography variant="body2" color="text.secondary" className={styles.noFavorites}>
          No saved favorites yet.
        </Typography>
      ) : (
        <div className={styles.grid5}>
          {favorites.map((fav) => (
            <Card key={fav.id} className={styles.vCard} elevation={1}>
              <CardActionArea onClick={() => goToShopWithCart(fav.id)}>
                <CardHeader
                  className={styles.vHeader}
                  title={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {fav.pinned && (
                        <Tooltip title="Pinned">
                          <PushPinIcon fontSize="small" />
                        </Tooltip>
                      )}
                      <Typography variant="subtitle1" className={styles.cardTitle}>
                        {fav.name}
                      </Typography>
                    </Stack>
                  }
                  subheader={
                    <Typography variant="caption" color="text.secondary">
                      Updated {new Date(fav.updatedAt).toLocaleDateString()}
                    </Typography>
                  }
                  action={
                    <Stack
                      direction="row"
                      spacing={0.5}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Tooltip title="Rename">
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />

                <CardContent className={styles.vContent}>
                  <ul className={styles.productList}>
                    {fav.products.map((p) => (
                      <li key={p.id} className={styles.productRow}>
                        <img src={BLANK_IMG} alt="" className={styles.productThumb} />
                        <span className={styles.productName} title={p.name}>{p.name}</span>
                        <span className={styles.qty}>x{p.qty}</span>
                      </li>
                    ))}
                  </ul>

                  <Divider className={styles.divider} />

                  <Stack direction="row" spacing={1} alignItems="center" className={styles.itemsLine}>
                    <ShoppingCartIcon fontSize="small" />
                    <Typography variant="body2">{fav.items} items</Typography>
                  </Stack>

                  {fav.tags?.length ? (
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1 }}>
                      {fav.tags.map((t) => (
                        <Chip key={t} size="small" label={t} />
                      ))}
                    </Stack>
                  ) : null}
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      )}
    </Box>
  );
}
