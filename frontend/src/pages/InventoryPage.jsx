import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import TopBar from "../components/TopBar";
import api from "../services/api";

const InventoryPage = () => {
  const [summary, setSummary] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    sku: "",
    name: "",
    unit: "pcs",
    costPrice: "",
    salePrice: "",
    reorderLevel: ""
  });
  const [movement, setMovement] = useState({ productId: "", qty: "", type: "IN" });
  const [adjustment, setAdjustment] = useState({ productId: "", qty: "", notes: "" });
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const fetchData = async () => {
    try {
      const [summaryRes, productsRes] = await Promise.all([
        api.get("/inventory/summary"),
        api.get("/products")
      ]);
      setSummary(summaryRes.data);
      setProducts(productsRes.data);
    } catch (err) {
      showToast("Unable to load inventory data", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = async () => {
    try {
      await api.post("/products", {
        sku: form.sku,
        name: form.name,
        unit: form.unit,
        costPrice: Number(form.costPrice),
        salePrice: Number(form.salePrice),
        reorderLevel: Number(form.reorderLevel)
      });
      showToast("Product added");
      setForm({ sku: "", name: "", unit: "pcs", costPrice: "", salePrice: "", reorderLevel: "" });
      fetchData();
    } catch (err) {
      showToast("Unable to add product", "error");
    }
  };

  const handleMovement = async () => {
    try {
      await api.post("/inventory/logs", {
        productId: movement.productId,
        qty: Number(movement.qty),
        type: movement.type,
        referenceType: "MANUAL",
        referenceId: "manual"
      });
      showToast("Stock movement logged");
      setMovement({ productId: "", qty: "", type: "IN" });
      fetchData();
    } catch (err) {
      showToast("Unable to log movement", "error");
    }
  };

  const handleAdjustment = async () => {
    try {
      await api.post("/inventory/adjust", {
        productId: adjustment.productId,
        qty: Number(adjustment.qty),
        notes: adjustment.notes,
        referenceType: "ADJUST",
        referenceId: "adjust"
      });
      showToast("Adjustment saved");
      setAdjustment({ productId: "", qty: "", notes: "" });
      fetchData();
    } catch (err) {
      showToast("Unable to create adjustment", "error");
    }
  };

  return (
    <Box>
      <TopBar title="Inventory" />
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">Stock Summary</Typography>
              <Table sx={{ mt: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>SKU</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {summary.map((row) => {
                    const status = row.lowStock
                      ? row.stock <= row.product.reorderLevel / 2
                        ? "Critical"
                        : "Low"
                      : "Stable";
                    return (
                      <TableRow key={row.product._id}>
                        <TableCell>{row.product.sku}</TableCell>
                        <TableCell>{row.product.name}</TableCell>
                        <TableCell>{row.stock}</TableCell>
                        <TableCell>
                          <Chip
                            label={status}
                            color={status === "Stable" ? "success" : status === "Low" ? "warning" : "error"}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Add New Product</Typography>
              <TextField
                label="SKU"
                fullWidth
                sx={{ mt: 2 }}
                value={form.sku}
                onChange={(event) => setForm({ ...form, sku: event.target.value })}
              />
              <TextField
                label="Name"
                fullWidth
                sx={{ mt: 2 }}
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
              <TextField
                label="Unit"
                fullWidth
                sx={{ mt: 2 }}
                value={form.unit}
                onChange={(event) => setForm({ ...form, unit: event.target.value })}
              />
              <TextField
                label="Cost Price"
                fullWidth
                sx={{ mt: 2 }}
                value={form.costPrice}
                onChange={(event) => setForm({ ...form, costPrice: event.target.value })}
              />
              <TextField
                label="Sale Price"
                fullWidth
                sx={{ mt: 2 }}
                value={form.salePrice}
                onChange={(event) => setForm({ ...form, salePrice: event.target.value })}
              />
              <TextField
                label="Reorder Level"
                fullWidth
                sx={{ mt: 2 }}
                value={form.reorderLevel}
                onChange={(event) => setForm({ ...form, reorderLevel: event.target.value })}
              />
              <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleAddProduct}>
                Save Product
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Stock Movement</Typography>
              <TextField
                label="Product"
                select
                fullWidth
                sx={{ mt: 2 }}
                value={movement.productId}
                onChange={(event) => setMovement({ ...movement, productId: event.target.value })}
              >
                {products.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.sku} - {product.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Quantity"
                fullWidth
                sx={{ mt: 2 }}
                value={movement.qty}
                onChange={(event) => setMovement({ ...movement, qty: event.target.value })}
              />
              <TextField
                label="Type"
                select
                fullWidth
                sx={{ mt: 2 }}
                value={movement.type}
                onChange={(event) => setMovement({ ...movement, type: event.target.value })}
              >
                {["IN", "OUT"].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={handleMovement}>
                Log Movement
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Adjusting Entry</Typography>
              <TextField
                label="Product"
                select
                fullWidth
                sx={{ mt: 2 }}
                value={adjustment.productId}
                onChange={(event) => setAdjustment({ ...adjustment, productId: event.target.value })}
              >
                {products.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.sku} - {product.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Adjustment Qty"
                fullWidth
                sx={{ mt: 2 }}
                value={adjustment.qty}
                onChange={(event) => setAdjustment({ ...adjustment, qty: event.target.value })}
              />
              <TextField
                label="Notes"
                fullWidth
                sx={{ mt: 2 }}
                value={adjustment.notes}
                onChange={(event) => setAdjustment({ ...adjustment, notes: event.target.value })}
              />
              <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={handleAdjustment}>
                Create Adjustment
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.severity} onClose={() => setToast({ ...toast, open: false })}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InventoryPage;
