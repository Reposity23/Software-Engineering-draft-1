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
  Button,
  TextField,
  Grid,
  Chip
} from "@mui/material";
import TopBar from "../components/TopBar";

const BillingPaymentsPage = () => (
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
            <TableRow>
              <TableCell>JOAP-2031</TableCell>
              <TableCell>Ella Cruz</TableCell>
              <TableCell>₱2,500</TableCell>
              <TableCell>
                <Chip label="Pending Payment" color="warning" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Log GCash Payment</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField label="Order ID" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Amount" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="GCash Reference" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Payment Method" fullWidth value="GCash" />
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ mt: 2 }}>
          Save Payment (Direct Save)
        </Button>
      </CardContent>
    </Card>
  </Box>
);

export default BillingPaymentsPage;
