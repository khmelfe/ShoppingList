import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import highlight from "../highlight";

export default function ProductRow({ row, q }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width={56}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">{highlight(row.name, q)}</TableCell>
        <TableCell>{highlight(row.brand, q)}</TableCell>
        <TableCell>{highlight(row.category, q)}</TableCell>
        <TableCell sx={{ fontFamily: "ui-monospace, Menlo, Consolas, 'Courier New', monospace", letterSpacing: ".5px" }}>
          {row.barcode}
        </TableCell>
        <TableCell align="right">₪{row.price.toFixed(2)}</TableCell>
      </TableRow>

      <TableRow>
        {/* expand + product + brand + category + barcode + price = 6 */}
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 1 }}>
              {/* ---- Preview + history side-by-side ---- */}
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", flexWrap: "wrap" }}>
                {/* Image container (the "option for div with image inside") */}
                <Box
                  sx={{
                    width: 128,
                    height: 128,
                    borderRadius: 2,
                    border: "1px solid #e5e7eb",
                    background: "#f8fafc",
                    overflow: "hidden",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {row.image ? (
                    <img
                      src={row.image}
                      alt={row.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Typography variant="caption" sx={{ color: "#64748b" }}>
                      No image
                    </Typography>
                  )}
                </Box>

                {/* Price history table */}
                <Box sx={{ flex: 1, minWidth: 320 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Price history
                  </Typography>
                  <Table size="small" aria-label="history">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Store</TableCell>
                        <TableCell align="right">Price (₪)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.history.map((h) => (
                        <TableRow key={`${row.id}-${h.date}-${h.store}`}>
                          <TableCell>{h.date}</TableCell>
                          <TableCell>{h.store}</TableCell>
                          <TableCell align="right">₪{h.price.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

ProductRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    store: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    barcode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string, // NEW (optional)
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        store: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  q: PropTypes.string,
};
