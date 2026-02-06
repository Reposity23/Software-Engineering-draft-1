import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Grid,
  Chip,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import TopBar from "../components/TopBar";
import api from "../services/api";

const BillingPaymentsPage = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ orderId: "", amount: "", gcashRef: "" });
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const fetchPending = async () => {
    try {
      const response = await api.get("/orders", { params: { status: "pending_payment" } });
      setOrders(response.data);
    } catch (err) {
      showToast("Unable to load pending payments", "error");
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handlePayment = async () => {
    try {
      await api.post("/payments", {
        orderId: form.orderId,
        method: "GCash",
        gcashRef: form.gcashRef,
        amount: Number(form.amount)
      });
      showToast("Payment logged and posted");
      setForm({ orderId: "", amount: "", gcashRef: "" });
      fetchPending();
    } catch (err) {
      showToast("Unable to log payment", "error");
    }
  };

  return (
    <Box>
      <TopBar title="Billing & Payments" />
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">Pending Payments</Typography>
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const total = order.lines.reduce((sum, line) => sum + line.qty * line.unitPrice, 0);
                return (
                  <TableRow key={order._id}>
                    <TableCell>{order.orderNo}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>₱{total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip label={order.status} color="warning" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">Log GCash Payment</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Order"
                select
                fullWidth
                value={form.orderId}
                onChange={(event) => {
                  const order = orders.find((item) => item._id === event.target.value);
                  const total = order ? order.lines.reduce((sum, line) => sum + line.qty * line.unitPrice, 0) : "";
                  setForm({ ...form, orderId: event.target.value, amount: total });
                }}
              >
                {orders.map((order) => (
                  <MenuItem key={order._id} value={order._id}>
                    {order.orderNo} - {order.customerName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Amount"
                fullWidth
                value={form.amount}
                onChange={(event) => setForm({ ...form, amount: event.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="GCash Reference"
                fullWidth
                value={form.gcashRef}
                onChange={(event) => setForm({ ...form, gcashRef: event.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Payment Method" fullWidth value="GCash" disabled />
            </Grid>
          </Grid>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handlePayment}>
            Save Payment (Direct Save)
          </Button>
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

export default BillingPaymentsPage;
