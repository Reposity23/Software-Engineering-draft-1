import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <Box sx={{ padding: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
