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
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import TopBar from "../components/TopBar";
import api from "../services/api";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name: "", contact: "", phone: "", email: "" });
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const fetchSuppliers = async () => {
    try {
      const response = await api.get("/suppliers");
      setSuppliers(response.data);
    } catch (err) {
      showToast("Unable to load suppliers", "error");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSubmit = async () => {
    try {
      await api.post("/suppliers", form);
      showToast("Supplier added");
      setForm({ name: "", contact: "", phone: "", email: "" });
      fetchSuppliers();
    } catch (err) {
      showToast("Unable to save supplier", "error");
    }
  };

  return (
    <Box>
      <TopBar title="Suppliers" />
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">Supplier Directory</Typography>
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier._id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">Add Supplier</Typography>
          <TextField
            label="Name"
            fullWidth
            sx={{ mt: 2 }}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <TextField
            label="Contact Person"
            fullWidth
            sx={{ mt: 2 }}
            value={form.contact}
            onChange={(event) => setForm({ ...form, contact: event.target.value })}
          />
          <TextField
            label="Phone"
            fullWidth
            sx={{ mt: 2 }}
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            sx={{ mt: 2 }}
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
            Save Supplier
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

export default SuppliersPage;
