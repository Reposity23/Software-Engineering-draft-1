import React from "react";
import { Box, Typography, TextField, InputAdornment, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Supplier Management System
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          size="small"
          placeholder="Search modules, orders, suppliers..."
          sx={{ width: 320, backgroundColor: "#f3f4f6", borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Avatar sx={{ bgcolor: "#111827" }}>JD</Avatar>
      </Box>
    </Box>
  );
};

export default Topbar;
