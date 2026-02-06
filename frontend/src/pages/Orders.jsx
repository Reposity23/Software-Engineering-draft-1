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

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [line, setLine] = useState({ productId: "", qty: 1, unitPrice: 0 });
  const [form, setForm] = useState({
    customerName: "",
    customerAddress: "",
    customerContact: "",
  });

  const fetchOrders = () => {
    api.get("/api/orders").then((res) => setOrders(res.data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreate = () => {
    api
      .post("/api/orders", {
        ...form,
        lines: [line],
      })
      .then(() => {
        setForm({ customerName: "", customerAddress: "", customerContact: "" });
        setLine({ productId: "", qty: 1, unitPrice: 0 });
        fetchOrders();
      });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Orders
      </Typography>
      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Create Order (Direct Save)
          </Typography>
          <TextField
            label="Customer Name"
            fullWidth
            margin="dense"
            value={form.customerName}
            onChange={(event) => setForm({ ...form, customerName: event.target.value })}
          />
          <TextField
            label="Customer Address"
            fullWidth
            margin="dense"
            value={form.customerAddress}
            onChange={(event) => setForm({ ...form, customerAddress: event.target.value })}
          />
          <TextField
            label="Customer Contact"
            fullWidth
            margin="dense"
            value={form.customerContact}
            onChange={(event) => setForm({ ...form, customerContact: event.target.value })}
          />
          <TextField
            label="Product ID"
            fullWidth
            margin="dense"
            value={line.productId}
            onChange={(event) => setLine({ ...line, productId: event.target.value })}
          />
          <TextField
            label="Quantity"
            fullWidth
            margin="dense"
            type="number"
            value={line.qty}
            onChange={(event) => setLine({ ...line, qty: Number(event.target.value) })}
          />
          <TextField
            label="Unit Price"
            fullWidth
            margin="dense"
            type="number"
            value={line.unitPrice}
            onChange={(event) => setLine({ ...line, unitPrice: Number(event.target.value) })}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleCreate}>
            Save Order
          </Button>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Order List
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
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.orderNo}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={order.status === "Paid" ? "success" : "warning"}
                    />
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

export default Orders;
