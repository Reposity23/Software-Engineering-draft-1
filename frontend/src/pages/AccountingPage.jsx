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
  Button,
  Chip,
  Snackbar,
  Alert,
  TextField
} from "@mui/material";
import TopBar from "../components/TopBar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const AccountingPage = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [audit, setAudit] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const fetchLedger = async () => {
    try {
      const response = await api.get("/accounting/ledger");
      setEntries(response.data);
    } catch (err) {
      showToast("Unable to load ledger", "error");
    }
  };

  const fetchAudit = async () => {
    try {
      const response = await api.get("/payments/daily-audit", { params: { date } });
      setAudit(response.data);
    } catch (err) {
      showToast("Unable to load audit report", "error");
    }
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  useEffect(() => {
    fetchAudit();
  }, [date]);

  const handleReverse = async (entryId) => {
    try {
      await api.post(`/accounting/reverse/${entryId}`);
      showToast("Reversal entry created");
      fetchLedger();
    } catch (err) {
      showToast("Unable to reverse entry", "error");
    }
  };

  const canReverse = user?.role === "owner" || user?.role === "admin";

  return (
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
              {entries.map((entry) => (
                <TableRow key={entry._id}>
                  <TableCell>{entry.entryNo}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>{new Date(entry.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip label={entry.isReversal ? "Reversal" : "Posted"} color={entry.isReversal ? "warning" : "success"} />
                  </TableCell>
                  <TableCell>
                    {canReverse ? (
                      <Button variant="outlined" size="small" onClick={() => handleReverse(entry._id)}>
                        Reverse
                      </Button>
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        Restricted
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
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
          <TextField
            type="date"
            label="Audit Date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
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
              {audit.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{payment._id.slice(-6).toUpperCase()}</TableCell>
                  <TableCell>{payment.orderId?.orderNo || "N/A"}</TableCell>
                  <TableCell>{payment.gcashRef}</TableCell>
                  <TableCell>
                    <Chip label={payment.flaggedDuplicate ? "Duplicate" : "OK"} color={payment.flaggedDuplicate ? "error" : "success"} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

export default AccountingPage;
