import React from "react";
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
  Grid
} from "@mui/material";
import TopBar from "../components/TopBar";

const OrdersPage = () => (
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
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>JOAP-2031</TableCell>
              <TableCell>Ella Cruz</TableCell>
              <TableCell>
                <Chip label="Pending Payment" color="warning" />
              </TableCell>
              <TableCell>₱2,500</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>JOAP-2030</TableCell>
              <TableCell>Marco Sy</TableCell>
              <TableCell>
                <Chip label="Paid" color="success" />
              </TableCell>
              <TableCell>₱1,200</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Create Order</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField label="Customer Name" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Contact" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Address" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Product SKU" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Quantity" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Unit Price" fullWidth />
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ mt: 2 }}>
          Save Order
        </Button>
      </CardContent>
    </Card>
  </Box>
);

export default OrdersPage;
