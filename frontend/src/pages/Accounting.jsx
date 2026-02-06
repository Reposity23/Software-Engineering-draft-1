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
} from "@mui/material";
import api from "../utils/api";

const Accounting = () => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = () => {
    api.get("/api/accounting/ledger").then((res) => setEntries(res.data));
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleReverse = (entryId) => {
    api.post(`/api/accounting/reverse/${entryId}`).then(() => fetchEntries());
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Accounting Ledger (Append-Only)
      </Typography>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Journal Entries
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Entry No</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry._id}>
                  <TableCell>{entry.entryNo}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>{new Date(entry.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleReverse(entry._id)}
                      disabled={entry.isReversal}
                    >
                      Reverse Entry
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Accounting;
