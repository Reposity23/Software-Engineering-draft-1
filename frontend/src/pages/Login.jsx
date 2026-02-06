import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1f2937, #111827)",
      }}
    >
      <Card sx={{ width: 360, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            JOAP Hardware Trading
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Sign in to continue
          </Typography>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
