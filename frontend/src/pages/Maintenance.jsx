import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import api from "../utils/api";

const Maintenance = () => {
  const [file, setFile] = useState(null);

  const handleBackup = () => {
    api.get("/api/maintenance/backup").then((res) => {
      const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "joap-backup.json";
      link.click();
    });
  };

  const handleRestore = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    api.post("/api/maintenance/restore", formData).then(() => {
      setFile(null);
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Maintenance & Backup
      </Typography>
      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Manual Backup
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Export all collections to JSON for trial resets or audit recovery.
          </Typography>
          <Button variant="contained" onClick={handleBackup}>
            Download Backup
          </Button>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Restore Data
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Upload a JSON backup to restore collections.
          </Typography>
          <input type="file" onChange={(event) => setFile(event.target.files[0])} />
          <Button variant="outlined" sx={{ mt: 2 }} onClick={handleRestore}>
            Restore Backup
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Maintenance;
