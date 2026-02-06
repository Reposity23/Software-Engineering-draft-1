import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import api from "../utils/api";

const BillingPayments = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [form, setForm] = useState({ orderId: "", method: "GCash", gcashRef: "", amount: 0 });

  const fetchPending = () => {
    api
      .get("/api/orders", { params: { status: "Pending Payment" } })
      .then((res) => setPendingOrders(res.data));
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleLogPayment = () => {
    api.post("/api/payments", form).then(() => {
      setForm({ orderId: "", method: "GCash", gcashRef: "", amount: 0 });
      fetchPending();
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Billing & Payment (Direct Save)
      </Typography>
      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Log GCash Payment
          </Typography>
          <TextField
            label="Order ID"
            fullWidth
            margin="dense"
            value={form.orderId}
            onChange={(event) => setForm({ ...form, orderId: event.target.value })}
          />
          <TextField
            label="GCash Reference"
            fullWidth
            margin="dense"
            value={form.gcashRef}
            onChange={(event) => setForm({ ...form, gcashRef: event.target.value })}
          />
          <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="dense"
            value={form.amount}
            onChange={(event) => setForm({ ...form, amount: Number(event.target.value) })}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogPayment}>
            Save Payment & Post to Accounting
          </Button>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Pending Payments
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Order No</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.orderNo}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    <Chip label={order.status} color="warning" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BillingPayments;
