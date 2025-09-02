import React from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import OrderRow from "../OrderRow/OrderRow";

export default function OrdersTable({ orders, emptyMessage }) {
  return (
    <TableContainer component={Paper} elevation={1}>
      <Box sx={{ p: 2, pb: 0 }}>
        <Typography variant="h6" fontWeight={800}>Orders</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Click a row to view the full list with barcodes & prices.
        </Typography>
      </Box>

      <Table aria-label="orders">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Supermarket</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Total (₪)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((o) => <OrderRow key={o.id} order={o} />)}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>
                <Box sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
                  {emptyMessage}
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
