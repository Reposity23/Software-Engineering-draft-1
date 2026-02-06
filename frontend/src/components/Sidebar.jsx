import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payments";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import BuildIcon from "@mui/icons-material/Build";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Inventory", icon: <InventoryIcon />, path: "/inventory" },
  { label: "Suppliers", icon: <PeopleIcon />, path: "/suppliers" },
  { label: "Orders", icon: <ShoppingCartIcon />, path: "/orders" },
  { label: "Billing & Payment", icon: <PaymentIcon />, path: "/billing-payments" },
  { label: "Accounting", icon: <AccountBalanceIcon />, path: "/accounting" },
  { label: "Reports", icon: <AssessmentIcon />, path: "/reports" },
  { label: "Search", icon: <SearchIcon />, path: "/search" },
  { label: "Maintenance", icon: <BuildIcon />, path: "/maintenance" },
  { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
  { label: "Help", icon: <HelpIcon />, path: "/help" },
  { label: "About", icon: <InfoIcon />, path: "/about" },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 260,
        backgroundColor: "#111827",
        color: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        padding: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        JOAP Hardware
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar sx={{ bgcolor: "#6366f1", mr: 1 }}>JH</Avatar>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Maria Dela Cruz
          </Typography>
          <Typography variant="caption" sx={{ color: "#9ca3af" }}>
            Owner
          </Typography>
        </Box>
      </Box>
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              color: "#e5e7eb",
              "&.active": {
                backgroundColor: "rgba(99, 102, 241, 0.2)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <ListItemButton sx={{ borderRadius: 2, color: "#f87171" }}>
        <ListItemIcon sx={{ color: "inherit" }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Box>
  );
};

export default Sidebar;
