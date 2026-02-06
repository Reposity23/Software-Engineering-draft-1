import React from "react";
import { Box, Card, CardContent, Typography, Switch, FormControlLabel, TextField } from "@mui/material";
import TopBar from "../components/TopBar";

const SettingsPage = () => (
  <Box>
    <TopBar title="Settings" />
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Appearance</Typography>
        <FormControlLabel control={<Switch />} label="Enable dark mode" />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Profile
        </Typography>
        <TextField label="Name" fullWidth sx={{ mt: 2 }} />
        <TextField label="Email" fullWidth sx={{ mt: 2 }} />
      </CardContent>
    </Card>
  </Box>
);

export default SettingsPage;
