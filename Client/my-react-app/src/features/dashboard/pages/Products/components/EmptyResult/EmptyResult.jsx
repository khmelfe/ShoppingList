import React from "react";
import { Box } from "@mui/material";

export default function EmptyResult({ query }) {
  return (
    <Box
      sx={{
        mt: 1,
        border: "1px dashed #cbd5e1",
        borderRadius: 2,
        color: "#64748b",
        minHeight: 120,
        display: "grid",
        placeItems: "center",
        fontWeight: 600,
      }}
    >
      No products match “{query}”.
    </Box>
  );
}
