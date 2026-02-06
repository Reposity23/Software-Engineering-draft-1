import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar
} from "@mui/material";
import {
  Dashboard,
  Inventory,
  ShoppingCart,
  Payments,
  Book,
  Assessment,
  Search,
  Settings,
  Help,
  Info,
  Build,
  Logout
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: <Dashboard />, to: "/dashboard" },
  { label: "Inventory", icon: <Inventory />, to: "/inventory" },
  { label: "Suppliers", icon: <Build />, to: "/suppliers" },
  { label: "Orders", icon: <ShoppingCart />, to: "/orders" },
  { label: "Billing & Payments", icon: <Payments />, to: "/billing-payments" },
  { label: "Accounting", icon: <Book />, to: "/accounting" },
  { label: "Reports", icon: <Assessment />, to: "/reports" },
  { label: "Search", icon: <Search />, to: "/search" },
  { label: "Maintenance", icon: <Build />, to: "/maintenance" },
  { label: "Settings", icon: <Settings />, to: "/settings" },
  { label: "Help", icon: <Help />, to: "/help" },
  { label: "About", icon: <Info />, to: "/about" }
];

const Sidebar = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: 260,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width: 260,
        boxSizing: "border-box",
        backgroundColor: "#0f172a",
        color: "#e2e8f0"
      }
    }}
  >
    <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar sx={{ bgcolor: "#38bdf8" }}>J</Avatar>
      <Box>
        <Typography variant="subtitle1" fontWeight={700}>
          JOAP Hardware
        </Typography>
        <Typography variant="caption">Supplier Management</Typography>
      </Box>
    </Box>
    <List sx={{ px: 1 }}>
      {navItems.map((item) => (
        <ListItem key={item.label} disablePadding>
          <ListItemButton
            component={NavLink}
            to={item.to}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.active": {
                backgroundColor: "rgba(56, 189, 248, 0.2)",
                color: "#38bdf8"
              }
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Box sx={{ mt: "auto", p: 2 }}>
      <ListItemButton sx={{ borderRadius: 2, color: "#f8fafc" }}>
        <ListItemIcon sx={{ color: "inherit" }}>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Box>
  </Drawer>
);

export default Sidebar;
