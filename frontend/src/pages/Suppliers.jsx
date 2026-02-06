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
} from "@mui/material";
import api from "../utils/api";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name: "", contact: "", phone: "" });

  const fetchSuppliers = () => {
    api.get("/api/suppliers").then((res) => setSuppliers(res.data));
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleAdd = () => {
    api.post("/api/suppliers", form).then(() => {
      setForm({ name: "", contact: "", phone: "" });
      fetchSuppliers();
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Suppliers
      </Typography>
      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Supplier
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <TextField
            label="Contact"
            fullWidth
            margin="dense"
            value={form.contact}
            onChange={(event) => setForm({ ...form, contact: event.target.value })}
          />
          <TextField
            label="Phone"
            fullWidth
            margin="dense"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleAdd}>
            Save Supplier
          </Button>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Supplier Directory
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier._id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Suppliers;
