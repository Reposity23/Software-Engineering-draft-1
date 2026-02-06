import React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import { Notifications, AccountCircle } from "@mui/icons-material";

const TopBar = ({ title }) => (
  <AppBar
    position="static"
    elevation={0}
    sx={{ backgroundColor: "transparent", color: "inherit" }}
  >
    <Toolbar sx={{ px: 0 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          JOAP Hardware Trading · Supplier Management
        </Typography>
      </Box>
      <IconButton>
        <Badge badgeContent={3} color="secondary">
          <Notifications />
        </Badge>
      </IconButton>
      <IconButton>
        <AccountCircle />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default TopBar;
