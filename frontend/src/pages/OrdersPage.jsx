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
  Chip,
  TextField,
  Button,
  Grid,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import TopBar from "../components/TopBar";
import api from "../services/api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    orderNo: "",
    customerName: "",
    customerAddress: "",
    customerContact: "",
    productId: "",
    qty: "",
    unitPrice: ""
  });
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (err) {
      showToast("Unable to load orders", "error");
    }
  };

  const fetchProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const handleReserve = async (orderId) => {
    try {
      await api.post(`/orders/${orderId}/reserve`);
      showToast("Order reserved and marked pending payment");
      fetchOrders();
    } catch (err) {
      showToast("Unable to reserve order", "error");
    }
  };

  const handleCreateOrder = async () => {
    try {
      await api.post("/orders", {
        orderNo: form.orderNo,
        customerName: form.customerName,
        customerAddress: form.customerAddress,
        customerContact: form.customerContact,
        lines: [
          {
            productId: form.productId,
            qty: Number(form.qty),
            unitPrice: Number(form.unitPrice)
          }
        ]
      });
      showToast("Order created");
      setForm({
        orderNo: "",
        customerName: "",
        customerAddress: "",
        customerContact: "",
        productId: "",
        qty: "",
        unitPrice: ""
      });
      fetchOrders();
    } catch (err) {
      showToast("Unable to create order", "error");
    }
  };

  return (
    <Box>
      <TopBar title="Orders" />
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">Order List</Typography>
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Order No</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const total = order.lines.reduce((sum, line) => sum + line.qty * line.unitPrice, 0);
                return (
                  <TableRow key={order._id}>
                    <TableCell>{order.orderNo}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={order.status === "Paid" ? "success" : order.status === "Pending Payment" ? "warning" : "default"}
                      />
                    </TableCell>
                    <TableCell>₱{total.toLocaleString()}</TableCell>
                    <TableCell>
                      {order.status !== "Pending Payment" && order.status !== "Paid" ? (
                        <Button variant="outlined" size="small" onClick={() => handleReserve(order._id)}>
                          Reserve
                        </Button>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          {order.status}
                        </Typography>
                      )}
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
          <Typography variant="h6">Create Order</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Order No"
                fullWidth
                value={form.orderNo}
                onChange={(event) => setForm({ ...form, orderNo: event.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Customer Name"
                fullWidth
                value={form.customerName}
                onChange={(event) => setForm({ ...form, customerName: event.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Contact"
                fullWidth
                value={form.customerContact}
                onChange={(event) => setForm({ ...form, customerContact: event.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                value={form.customerAddress}
                onChange={(event) => setForm({ ...form, customerAddress: event.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Product"
                select
                fullWidth
                value={form.productId}
                onChange={(event) => setForm({ ...form, productId: event.target.value })}
              >
                {products.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.sku} - {product.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Quantity"
                fullWidth
                value={form.qty}
                onChange={(event) => setForm({ ...form, qty: event.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Unit Price"
                fullWidth
                value={form.unitPrice}
                onChange={(event) => setForm({ ...form, unitPrice: event.target.value })}
              />
            </Grid>
          </Grid>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleCreateOrder}>
            Save Order
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

export default OrdersPage;
