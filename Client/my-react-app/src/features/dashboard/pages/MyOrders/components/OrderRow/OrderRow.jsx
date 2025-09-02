import React, { useState } from "react";
import {
  Box, Chip, Collapse, IconButton, Stack,
  TableRow, TableCell, Typography
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ILS } from "../../mockOrders";
import OrderItemsTable from "../OrderItemsTable/OrderItemsTable";

export default function OrderRow({ order }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell width={56} sx={{ pl: 1 }}>
          <IconButton size="small" onClick={() => setOpen((o) => !o)} aria-label={open ? "Hide" : "Show"}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography fontWeight={600}>{order.supermarket}</Typography>
            <Chip size="small" label={order.id} variant="outlined" />
          </Stack>
        </TableCell>
        <TableCell>{order.date}</TableCell>
        <TableCell>{order.location}</TableCell>
        <TableCell>{order.city}</TableCell>
        <TableCell align="right" sx={{ fontWeight: 700 }}>
          {ILS.format(order.total)}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={6} sx={{ py: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ px: 2, py: 2 }}>
              <OrderItemsTable order={order} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
