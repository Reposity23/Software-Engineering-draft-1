import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
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

const Inventory = () => {
  const [summary, setSummary] = useState([]);
  const [productForm, setProductForm] = useState({
    sku: "",
    name: "",
    unit: "pcs",
    costPrice: 0,
    salePrice: 0,
    reorderLevel: 0,
  });
  const [logForm, setLogForm] = useState({ productId: "", type: "IN", qty: 0 });

  const fetchSummary = () => {
    api
      .get("/api/inventory/summary")
      .then((res) => setSummary(res.data))
      .catch(() => setSummary([]));
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleAddProduct = () => {
    api.post("/api/products", productForm).then(() => {
      setProductForm({
        sku: "",
        name: "",
        unit: "pcs",
        costPrice: 0,
        salePrice: 0,
        reorderLevel: 0,
      });
      fetchSummary();
    });
  };

  const handleAddLog = () => {
    api.post("/api/inventory/logs", logForm).then(() => {
      setLogForm({ productId: "", type: "IN", qty: 0 });
      fetchSummary();
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Inventory
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Add Product
              </Typography>
              <TextField
                label="SKU"
                fullWidth
                margin="dense"
                value={productForm.sku}
                onChange={(event) => setProductForm({ ...productForm, sku: event.target.value })}
              />
              <TextField
                label="Name"
                fullWidth
                margin="dense"
                value={productForm.name}
                onChange={(event) => setProductForm({ ...productForm, name: event.target.value })}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Unit"
                    fullWidth
                    margin="dense"
                    value={productForm.unit}
                    onChange={(event) =>
                      setProductForm({ ...productForm, unit: event.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Reorder Level"
                    fullWidth
                    margin="dense"
                    type="number"
                    value={productForm.reorderLevel}
                    onChange={(event) =>
                      setProductForm({ ...productForm, reorderLevel: Number(event.target.value) })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Cost Price"
                    fullWidth
                    margin="dense"
                    type="number"
                    value={productForm.costPrice}
                    onChange={(event) =>
                      setProductForm({ ...productForm, costPrice: Number(event.target.value) })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Sale Price"
                    fullWidth
                    margin="dense"
                    type="number"
                    value={productForm.salePrice}
                    onChange={(event) =>
                      setProductForm({ ...productForm, salePrice: Number(event.target.value) })
                    }
                  />
                </Grid>
              </Grid>
              <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleAddProduct}>
                Save Product
              </Button>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Add Stock Movement (Append-Only)
              </Typography>
              <TextField
                label="Product ID"
                fullWidth
                margin="dense"
                value={logForm.productId}
                onChange={(event) => setLogForm({ ...logForm, productId: event.target.value })}
              />
              <TextField
                label="Type (IN/OUT/ADJ/RESERVE)"
                fullWidth
                margin="dense"
                value={logForm.type}
                onChange={(event) => setLogForm({ ...logForm, type: event.target.value })}
              />
              <TextField
                label="Quantity"
                type="number"
                fullWidth
                margin="dense"
                value={logForm.qty}
                onChange={(event) => setLogForm({ ...logForm, qty: Number(event.target.value) })}
              />
              <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={handleAddLog}>
                Record Movement
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Stock Summary
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {summary.map((entry) => (
                    <TableRow key={entry.product._id}>
                      <TableCell>{entry.product.name}</TableCell>
                      <TableCell>{entry.product.sku}</TableCell>
                      <TableCell>{entry.stock}</TableCell>
                      <TableCell>
                        <Chip
                          label={entry.status}
                          color={entry.status === "Critical" ? "error" : "default"}
                          variant={entry.status === "Low Stock" ? "outlined" : "filled"}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Inventory;
