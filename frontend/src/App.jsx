import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo } from "react";
import getTheme from "./theme";
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
import ProtectedRoute from "./components/ProtectedRoute";
import { useThemeMode } from "./context/ThemeModeContext";

const withLayout = (Component, title) => (
  <DashboardLayout>
    <Component title={title} />
  </DashboardLayout>
);

const App = () => {
  const { mode } = useThemeMode();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {withLayout(DashboardPage, "Dashboard")}
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              {withLayout(InventoryPage, "Inventory")}
            </ProtectedRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <ProtectedRoute>
              {withLayout(SuppliersPage, "Suppliers")}
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              {withLayout(OrdersPage, "Orders")}
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing-payments"
          element={
            <ProtectedRoute>
              {withLayout(BillingPaymentsPage, "Billing & Payments")}
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounting"
          element={
            <ProtectedRoute roles={["owner", "admin"]}>
              {withLayout(AccountingPage, "Accounting")}
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              {withLayout(ReportsPage, "Reports")}
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              {withLayout(SearchPage, "Search")}
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance"
          element={
            <ProtectedRoute roles={["owner", "admin"]}>
              {withLayout(MaintenancePage, "Maintenance")}
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute roles={["owner", "admin"]}>
              {withLayout(SettingsPage, "Settings")}
            </ProtectedRoute>
          }
        />
        <Route
          path="/help"
          element={
            <ProtectedRoute>
              {withLayout(HelpPage, "Help & Support")}
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              {withLayout(AboutPage, "About")}
            </ProtectedRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
