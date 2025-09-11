import React from "react";
import {
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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import styles from "./FavoriteCard.module.css";

export default function FavoriteCard({ fav, blankImg, onOpen, onRename, onDelete }) {
  return (
    <Card className={styles.vCard} elevation={1}>
      <CardActionArea onClick={() => onOpen?.(fav.id)}>
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
            <Stack direction="row" spacing={0.5} onClick={(e) => e.stopPropagation()}>
              <Tooltip title="Rename">
                <IconButton size="small" onClick={() => onRename?.(fav.id)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton size="small" onClick={() => onDelete?.(fav.id)}>
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
                <img src={blankImg} alt="" className={styles.productThumb} />
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
  );
}
