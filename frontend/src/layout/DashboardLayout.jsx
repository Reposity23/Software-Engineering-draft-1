import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => (
  <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
    <Sidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
      {children}
    </Box>
  </Box>
);

export default DashboardLayout;
