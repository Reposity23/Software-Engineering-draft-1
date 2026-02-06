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
  TextField,
  Button
} from "@mui/material";
import TopBar from "../components/TopBar";

const SuppliersPage = () => (
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
            <TableRow>
              <TableCell>North Tools Supply</TableCell>
              <TableCell>Ramon Dela Cruz</TableCell>
              <TableCell>09171234567</TableCell>
              <TableCell>north@tools.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Metro Hardware Hub</TableCell>
              <TableCell>Ana Lim</TableCell>
              <TableCell>09998887777</TableCell>
              <TableCell>metro@hardware.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Add Supplier</Typography>
        <TextField label="Name" fullWidth sx={{ mt: 2 }} />
        <TextField label="Contact Person" fullWidth sx={{ mt: 2 }} />
        <TextField label="Phone" fullWidth sx={{ mt: 2 }} />
        <TextField label="Email" fullWidth sx={{ mt: 2 }} />
        <Button variant="contained" sx={{ mt: 2 }}>
          Save Supplier
        </Button>
      </CardContent>
    </Card>
  </Box>
);

export default SuppliersPage;
