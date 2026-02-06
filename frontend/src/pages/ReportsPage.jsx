import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Snackbar, Alert } from "@mui/material";
import TopBar from "../components/TopBar";
import api from "../services/api";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const ReportsPage = () => {
  const [summary, setSummary] = useState({ totalOrders: 0, totalPaid: 0, totalSales: 0 });
  const [sales, setSales] = useState([]);
  const [movements, setMovements] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const fetchReports = async () => {
    try {
      const [summaryRes, movementRes, salesRes] = await Promise.all([
        api.get("/reports/summary"),
        api.get("/reports/inventory-movements"),
        api.get("/reports/sales-summary")
      ]);
      setSummary(summaryRes.data);
      setMovements(
        movementRes.data.map((item) => ({
          name: item.type,
          qty: item.qty
        }))
      );
      setSales(
        salesRes.data.map((item) => ({
          date: item._id,
          total: item.total
        }))
      );
    } catch (err) {
      showToast("Unable to load reports", "error");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Box>
      <TopBar title="Reports" />
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Sales Summary</Typography>
              <Typography variant="body2" color="text.secondary">
                Total sales: ₱{summary.totalSales.toLocaleString()} · Paid Orders: {summary.totalPaid}
              </Typography>
              <Box sx={{ mt: 3, height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#1e40af" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Inventory Movements</Typography>
              <Typography variant="body2" color="text.secondary">
                Stock in/out movement logs.
              </Typography>
              <Box sx={{ mt: 3, height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={movements}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="qty" fill="#0284c7" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">Advanced Analytics</Typography>
          <Typography variant="body2" color="text.secondary">
            ARIMA demand forecasting will be available in a future enhancement.
          </Typography>
        </CardContent>
      </Card>
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.severity} onClose={() => setToast({ ...toast, open: false })}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReportsPage;
