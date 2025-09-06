import React from "react";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, IconButton, Stack, Table, TableBody, TableCell, TableRow, Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styles from "./ProductDialog.module.css";

function NutritionTable({ nutrition }) {
  if (!nutrition) return null;
  const rows = [
    { k: "Energy", v: nutrition.energy },
    { k: "Protein", v: nutrition.protein },
    { k: "Carbohydrates", v: nutrition.carbs },
    { k: "Fat", v: nutrition.fat },
  ];
  return (
    <Table size="small" className={styles.nutritionTable}>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.k}>
            <TableCell><Typography variant="body2">{r.k} (per 100 g/ml)</Typography></TableCell>
            <TableCell align="right"><Typography variant="body2" fontWeight={600}>{r.v}</Typography></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function Section({ title, children }) {
  return (
    <Stack spacing={1.25} sx={{ mb: 2.5 }}>
      <Typography variant="h6" fontWeight={800}>{title}</Typography>
      {children}
    </Stack>
  );
}

export default function ProductDialog({ product, onClose, onAdd }) {
  if (!product) return null;
  const d = product.details || {};

  return (
    <Dialog open={!!product} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className={styles.dialogTitle}>
        <span className={styles.dialogTitleText}>{product.name}</span>
        <IconButton onClick={onClose} className={styles.dialogClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box className={styles.dialogHeroImage}>Product Image Placeholder</Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Section title="Ingredients & Allergens">
              <Stack spacing={0.5}>
                <Typography variant="body2"><b>Ingredients:</b> {d.ingredients || "—"}</Typography>
                <Typography variant="body2"><b>Allergens:</b> {d.allergens || "—"}</Typography>
              </Stack>
            </Section>
            <Section title="General Details">
              <Stack spacing={0.5}>
                <Typography variant="body2"><b>Origin:</b> {d.origin || "—"}</Typography>
                <Typography variant="body2"><b>Unit:</b> {d.unit || "—"}</Typography>
              </Stack>
            </Section>
          </Grid>
          <Grid item xs={12} md={6}>
            <Section title="Nutrition Facts">
              {d.nutrition
                ? <NutritionTable nutrition={d.nutrition} />
                : <Typography variant="body2" color="text.secondary">Not applicable for this product.</Typography>}
            </Section>
          </Grid>
        </Grid>

        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
          * Always check the label before use or consumption.
        </Typography>
      </DialogContent>

      <DialogActions className={styles.dialogActions}>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" startIcon={<AddShoppingCartIcon />} onClick={() => onAdd(product)}>
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
}
