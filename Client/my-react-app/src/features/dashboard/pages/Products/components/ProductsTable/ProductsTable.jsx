import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ProductRow from "../ProductRow/ProductRow";

export default function ProductsTable({ rows, query }) {
  return (
    <TableContainer>
      <Table aria-label="products table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 56 }} />
            <TableCell>Product</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Barcode</TableCell>       {/* NEW */}
            <TableCell align="right">Price (₪)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <ProductRow key={row.id} row={row} q={query} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
