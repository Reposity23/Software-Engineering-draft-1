import React, { useRef, useState } from "react";
import { Box, Card, CardContent, Typography, Button, Stack, Snackbar, Alert } from "@mui/material";
import TopBar from "../components/TopBar";
import api from "../services/api";

const MaintenancePage = () => {
  const fileRef = useRef(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleDownload = async () => {
    try {
      const response = await api.get("/maintenance/backup", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "backup.json");
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast("Backup downloaded");
    } catch (err) {
      showToast("Unable to download backup", "error");
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      await api.post("/maintenance/restore?mode=overwrite", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      showToast("Restore completed");
      window.location.reload();
    } catch (err) {
      showToast("Restore failed", "error");
    }
  };

  return (
    <Box>
      <TopBar title="Maintenance" />
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">Backup & Restore</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Export all collections for manual backup or restore a JSON snapshot.
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Button variant="contained" onClick={handleDownload}>
              Download Backup JSON
            </Button>
            <Button variant="outlined" onClick={() => fileRef.current?.click()}>
              Upload Restore File
            </Button>
          </Stack>
          <input ref={fileRef} type="file" hidden onChange={handleUpload} />
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

export default MaintenancePage;
