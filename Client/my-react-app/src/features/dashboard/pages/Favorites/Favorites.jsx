import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import page from "./favorites.module.css";

import HeaderHero from "./components/HeaderHero/HeaderHero";
import AddFavoriteButton from "./components/AddFavoriteButton/AddFavoriteButton";
import FavoriteCard from "./components/FavoriteCard/FavoriteCard";

import useFavorites from "./hooks/useFavorites";
import { setJSON } from "./utils/storage";
import { PENDING_FAVORITE_KEY, BLANK_IMG } from "./utils/constants";

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, getById } = useFavorites();

  const openFavoriteInShop = (favId) => {
    const fav = getById(favId);
    if (fav) {
      setJSON(PENDING_FAVORITE_KEY, {
        id: fav.id,
        name: fav.name,
        items: fav.products || [],
        mode: "replace",
        ts: Date.now(),
      });
    }
    navigate(`/dashboard/shop?cart=${encodeURIComponent(favId)}`);
  };

  return (
    <Box className={page.page}>
      <HeaderHero />

      {/* Row 1 — centered compact add button (confetti on hover) */}
      <div className={page.newRow}>
        <AddFavoriteButton text="New Favorite" onClick={() => navigate("/dashboard/shop")} />
      </div>

      {/* Row 2+ — saved favorites grid */}
      {favorites.length === 0 ? (
        <Box className={page.emptyWrap}>
          <FavoriteIcon className={page.emptyIcon} />
          <Typography variant="h6" className={page.emptyTitle}>No favorite carts yet</Typography>
          <Typography variant="body2" color="text.secondary">
            Use “New Favorite” above to start one.
          </Typography>
        </Box>
      ) : (
        <div className={page.grid5}>
          {favorites.map((fav) => (
            <FavoriteCard
              key={fav.id}
              fav={fav}
              blankImg={BLANK_IMG}
              onOpen={openFavoriteInShop}
              onRename={(id) => console.log("rename", id)}
              onDelete={(id) => console.log("delete", id)}
            />
          ))}
        </div>
      )}
    </Box>
  );
}
