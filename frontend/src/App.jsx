import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Inventory from "./pages/Inventory.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import Orders from "./pages/Orders.jsx";
import BillingPayments from "./pages/BillingPayments.jsx";
import Accounting from "./pages/Accounting.jsx";
import Reports from "./pages/Reports.jsx";
import Search from "./pages/Search.jsx";
import Maintenance from "./pages/Maintenance.jsx";
import Settings from "./pages/Settings.jsx";
import Help from "./pages/Help.jsx";
import About from "./pages/About.jsx";

const App = () => {
  const renderWithLayout = (Component) => (
    <Layout>
      <Component />
    </Layout>
  );

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={renderWithLayout(Dashboard)} />
      <Route path="/inventory" element={renderWithLayout(Inventory)} />
      <Route path="/suppliers" element={renderWithLayout(Suppliers)} />
      <Route path="/orders" element={renderWithLayout(Orders)} />
      <Route path="/billing-payments" element={renderWithLayout(BillingPayments)} />
      <Route path="/accounting" element={renderWithLayout(Accounting)} />
      <Route path="/reports" element={renderWithLayout(Reports)} />
      <Route path="/search" element={renderWithLayout(Search)} />
      <Route path="/maintenance" element={renderWithLayout(Maintenance)} />
      <Route path="/settings" element={renderWithLayout(Settings)} />
      <Route path="/help" element={renderWithLayout(Help)} />
      <Route path="/about" element={renderWithLayout(About)} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
