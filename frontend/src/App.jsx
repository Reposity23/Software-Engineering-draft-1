import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import DashboardLayout from "./layout/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import SuppliersPage from "./pages/SuppliersPage";
import OrdersPage from "./pages/OrdersPage";
import BillingPaymentsPage from "./pages/BillingPaymentsPage";
import AccountingPage from "./pages/AccountingPage";
import ReportsPage from "./pages/ReportsPage";
import SearchPage from "./pages/SearchPage";
import MaintenancePage from "./pages/MaintenancePage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";
import AboutPage from "./pages/AboutPage";

const withLayout = (Component, title) => (
  <DashboardLayout>
    <Component title={title} />
  </DashboardLayout>
);

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={withLayout(DashboardPage, "Dashboard")} />
      <Route path="/inventory" element={withLayout(InventoryPage, "Inventory")} />
      <Route path="/suppliers" element={withLayout(SuppliersPage, "Suppliers")} />
      <Route path="/orders" element={withLayout(OrdersPage, "Orders")} />
      <Route
        path="/billing-payments"
        element={withLayout(BillingPaymentsPage, "Billing & Payments")}
      />
      <Route path="/accounting" element={withLayout(AccountingPage, "Accounting")} />
      <Route path="/reports" element={withLayout(ReportsPage, "Reports")} />
      <Route path="/search" element={withLayout(SearchPage, "Search")}
      />
      <Route path="/maintenance" element={withLayout(MaintenancePage, "Maintenance")} />
      <Route path="/settings" element={withLayout(SettingsPage, "Settings")} />
      <Route path="/help" element={withLayout(HelpPage, "Help & Support")} />
      <Route path="/about" element={withLayout(AboutPage, "About")}
      />
    </Routes>
  </ThemeProvider>
);

export default App;
