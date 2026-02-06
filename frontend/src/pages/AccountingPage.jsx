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
  Chip
} from "@mui/material";
import TopBar from "../components/TopBar";

const AccountingPage = () => (
  <Box>
    <TopBar title="Accounting" />
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Ledger Entries</Typography>
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Entry No</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>JE-20240901</TableCell>
              <TableCell>Payment for Order JOAP-2030</TableCell>
              <TableCell>2024-09-01</TableCell>
              <TableCell>
                <Chip label="Posted" color="success" />
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small">
                  Reverse
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Daily Payment Audit</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Duplicate GCash references are flagged for investigation.
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>GCash Ref</TableCell>
              <TableCell>Flag</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>PMT-9901</TableCell>
              <TableCell>JOAP-2031</TableCell>
              <TableCell>GC-112233</TableCell>
              <TableCell>
                <Chip label="OK" color="success" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </Box>
);

export default AccountingPage;
