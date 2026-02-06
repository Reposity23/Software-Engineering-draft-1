import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Switch, TextField, Button } from "@mui/material";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState({ name: "Maria Dela Cruz", email: "owner@joap.local" });

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Settings
      </Typography>
      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Appearance
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            Toggle the interface theme.
          </Typography>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Profile Settings
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={profile.name}
            onChange={(event) => setProfile({ ...profile, name: event.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={profile.email}
            onChange={(event) => setProfile({ ...profile, email: event.target.value })}
          />
          <Button variant="contained" sx={{ mt: 2 }}>
            Save Profile
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
