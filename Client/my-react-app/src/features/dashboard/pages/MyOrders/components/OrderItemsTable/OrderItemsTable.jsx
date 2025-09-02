import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import { ILS } from "../../mockOrders";

export default function OrderItemsTable({ order }) {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
        Items in this order
      </Typography>

      <Table size="small" aria-label="order items">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Barcode</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Line Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.items.map((it, idx) => {
            const line = it.qty * it.unitPrice;
            return (
              <TableRow key={order.id + "-it-" + idx}>
                <TableCell>{it.name}</TableCell>
                <TableCell>{it.barcode}</TableCell>
                <TableCell align="right">{it.qty}</TableCell>
                <TableCell align="right">{ILS.format(it.unitPrice)}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  {ILS.format(line)}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={3} />
            <TableCell align="right" sx={{ fontWeight: 700 }}>
              Total
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 900 }}>
              {ILS.format(order.total)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}