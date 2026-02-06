import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import TopBar from "../components/TopBar";

const SearchPage = () => {
  const [mode, setMode] = useState("id");

  return (
    <Box>
      <TopBar title="Search" />
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">Product Search</Typography>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(event, value) => value && setMode(value)}
            sx={{ mt: 2 }}
          >
            <ToggleButton value="id">Search by ID (Hash Map)</ToggleButton>
            <ToggleButton value="name">Search by Name (Trie)</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            label={mode === "id" ? "Enter SKU" : "Enter name prefix"}
            fullWidth
            sx={{ mt: 2 }}
          />
          <List sx={{ mt: 2 }}>
            <ListItem>
              <ListItemText primary="Hammer 16oz" secondary="SKU: JOAP-001" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SearchPage;
