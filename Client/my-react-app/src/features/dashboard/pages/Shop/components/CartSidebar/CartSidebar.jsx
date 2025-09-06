import React from "react";
import {
  Button, Divider, IconButton, List, ListItem, ListItemSecondaryAction,
  ListItemText, Paper, Stack, Typography
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import styles from "./CartSidebar.module.css";

export default function CartSidebar({
  items, onInc, onDec, onRemove, onClear, onSaveFavorites, onFindCheapest,
}) {
  const itemCount = items.reduce((s, it) => s + it.qty, 0);

  return (
    <Paper variant="outlined" className={styles.cartSticky}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Stack>
          <Typography variant="h6" fontWeight={800}>Your Cart</Typography>
          <Typography variant="caption" color="text.secondary">
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </Typography>
        </Stack>
        {!!items.length && (
          <IconButton size="small" onClick={onClear}><DeleteOutlineIcon /></IconButton>
        )}
      </Stack>

      <Divider sx={{ mb: 1.5 }} />

      {items.length === 0 ? (
        <Stack alignItems="center" spacing={1} className={styles.cartEmpty}>
          <ShoppingCartCheckoutIcon />
          <Typography variant="body2">No items yet. Add some from the list.</Typography>
        </Stack>
      ) : (
        <List dense disablePadding>
          {items.map((it) => (
            <ListItem key={it.id} disableGutters className={styles.cartItem}>
              <ListItemText
                primary={<Typography variant="body2" fontWeight={700} noWrap title={it.name}>{it.name}</Typography>}
                secondary={
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                    <IconButton size="small" onClick={() => onDec(it.id)}><RemoveIcon fontSize="small" /></IconButton>
                    <Typography variant="body2" sx={{ minWidth: 20, textAlign: "center" }}>{it.qty}</Typography>
                    <IconButton size="small" onClick={() => onInc(it.id)}><AddIcon fontSize="small" /></IconButton>
                  </Stack>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => onRemove(it.id)}><DeleteOutlineIcon /></IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      <Stack spacing={1.2} sx={{ mt: 2 }}>
        <Button variant="outlined" startIcon={<StarBorderIcon />} disabled={!items.length} onClick={onSaveFavorites}>
          Save Cart to Favorites
        </Button>
        <Button variant="contained" startIcon={<MyLocationIcon />} disabled={!items.length} onClick={onFindCheapest}>
          Find Cheapest Near Me
        </Button>
      </Stack>
    </Paper>
  );
}
