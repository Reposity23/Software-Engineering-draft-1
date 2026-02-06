import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack
} from "@mui/material";

const LoginPage = () => (
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
        <Stack spacing={2} sx={{ mt: 3 }}>
          <TextField label="Email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          <Button variant="contained" size="large">
            Sign in
          </Button>
        </Stack>
      </CardContent>
    </Card>
  </Box>
);

export default LoginPage;
