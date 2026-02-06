import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/login", form);
      login(response.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(120deg, #e2e8f0, #f8fafc)"
      }}
    >
      <Card sx={{ width: 420, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Sign in to JOAP Hardware Trading
          </Typography>
          <Stack spacing={2} sx={{ mt: 3 }} component="form" onSubmit={handleSubmit}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Email"
              fullWidth
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
            <Button variant="contained" size="large" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
