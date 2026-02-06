import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import TopBar from "../components/TopBar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useThemeMode } from "../context/ThemeModeContext";

const SettingsPage = () => {
  const { user, setUser } = useAuth();
  const { mode, toggleMode } = useThemeMode();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || "", email: user.email || "", password: "" });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const response = await api.put("/auth/me", {
        name: form.name,
        email: form.email,
        password: form.password || undefined
      });
      setUser(response.data.user);
      setForm({ ...form, password: "" });
      showToast("Profile updated");
    } catch (err) {
      showToast("Unable to update profile", "error");
    }
  };

  return (
    <Box>
      <TopBar title="Settings" />
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">Appearance</Typography>
          <FormControlLabel
            control={<Switch checked={mode === "dark"} onChange={toggleMode} />}
            label="Enable dark mode"
          />
          <Typography variant="h6" sx={{ mt: 3 }}>
            Profile
          </Typography>
          <TextField
            label="Name"
            fullWidth
            sx={{ mt: 2 }}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            sx={{ mt: 2 }}
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
          <TextField
            label="New Password"
            fullWidth
            type="password"
            sx={{ mt: 2 }}
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
            Save Changes
          </Button>
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

export default SettingsPage;
