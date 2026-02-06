import React from "react";
import { Box, Card, CardContent, Typography, Button, Stack } from "@mui/material";
import TopBar from "../components/TopBar";

const MaintenancePage = () => (
  <Box>
    <TopBar title="Maintenance" />
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Backup & Restore</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Export all collections for manual backup or restore a JSON snapshot.
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Button variant="contained">Download Backup JSON</Button>
          <Button variant="outlined">Upload Restore File</Button>
        </Stack>
      </CardContent>
    </Card>
  </Box>
);

export default MaintenancePage;
