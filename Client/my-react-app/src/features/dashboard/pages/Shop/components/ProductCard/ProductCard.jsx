import React from "react";
import {
  Box, Button, Card, CardActionArea, CardActions, CardContent,
  Divider, IconButton, Stack, Tooltip, Typography
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./ProductCard.module.css";

function DetailsSnippet({ details }) {
  if (!details) return null;
  return (
    <Stack spacing={0.25} sx={{ mt: 0.5 }}>
      <Typography variant="caption" color="text.secondary" noWrap title={`Ingredients: ${details.ingredients}`}>
        <b>Ingredients:</b> {details.ingredients}
      </Typography>
      <Typography variant="caption" color="text.secondary" noWrap title={`Allergens: ${details.allergens}`}>
        <b>Allergens:</b> {details.allergens}
      </Typography>
      <Typography variant="caption" color="text.secondary" noWrap title={`Origin: ${details.origin} • Unit: ${details.unit}`}>
        <b>Origin:</b> {details.origin} • <b>Unit:</b> {details.unit}
      </Typography>
    </Stack>
  );
}

export default function ProductCard({ product, onOpen, onAdd }) {
  return (
    <Card className={styles.productCard} elevation={1}>
      <CardActionArea onClick={() => onOpen(product)} sx={{ flexGrow: 1 }}>
        <Box className={styles.productImagePlaceholder}>Image Placeholder</Box>

        <CardContent sx={{ py: 1.5 }}>
          <Stack spacing={0.5}>
            <Typography variant="subtitle1" fontWeight={700} noWrap title={product.name}>
              {product.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {product.category}
            </Typography>
            <DetailsSnippet details={product.details} />
          </Stack>
        </CardContent>
      </CardActionArea>

      <Divider />
      <CardActions sx={{ px: 1.5, py: 1 }}>
        <Tooltip title="Quick Add to Cart">
          <IconButton size="small" color="primary" onClick={() => onAdd(product)}>
            <AddShoppingCartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add to Favorites">
          <IconButton size="small">
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Box sx={{ flexGrow: 1 }} />
        <Button size="small" onClick={() => onOpen(product)}>Details</Button>
      </CardActions>
    </Card>
  );
}
