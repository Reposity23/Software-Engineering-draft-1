import React, { useState } from "react";
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
  Chip
} from "@mui/material";
import TopBar from "../components/TopBar";

const InventoryPage = () => {
  const [form, setForm] = useState({ sku: "", name: "", costPrice: "", salePrice: "" });

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
                  {[
                    { sku: "JOAP-001", name: "Hammer 16oz", stock: 8, status: "Stable" },
                    { sku: "JOAP-002", name: "Philips Screwdriver", stock: 3, status: "Low" },
                    { sku: "JOAP-003", name: "PVC Pipe 1/2 inch", stock: 12, status: "Critical" }
                  ].map((row) => (
                    <TableRow key={row.sku}>
                      <TableCell>{row.sku}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.stock}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          color={row.status === "Stable" ? "success" : row.status === "Low" ? "warning" : "error"}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
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
              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
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
              <TextField label="Product SKU" fullWidth sx={{ mt: 2 }} />
              <TextField label="Quantity" fullWidth sx={{ mt: 2 }} />
              <TextField label="Type (IN/OUT)" fullWidth sx={{ mt: 2 }} />
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                Log Movement
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Adjusting Entry</Typography>
              <TextField label="Product SKU" fullWidth sx={{ mt: 2 }} />
              <TextField label="Adjustment Qty" fullWidth sx={{ mt: 2 }} />
              <TextField label="Notes" fullWidth sx={{ mt: 2 }} />
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                Create Adjustment
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InventoryPage;
