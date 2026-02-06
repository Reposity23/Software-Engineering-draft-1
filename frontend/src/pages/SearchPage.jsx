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
  ListItemText,
  Snackbar,
  Alert
} from "@mui/material";
import TopBar from "../components/TopBar";
import api from "../services/api";

const SearchPage = () => {
  const [mode, setMode] = useState("id");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleSearch = async (value) => {
    setQuery(value);
    if (!value) {
      setResults([]);
      return;
    }
    try {
      if (mode === "id") {
        const response = await api.get(`/search/by-id/${value}`);
        setResults([response.data]);
      } else {
        const response = await api.get("/search/by-name", { params: { prefix: value } });
        setResults(response.data);
      }
    } catch (err) {
      showToast("No results found", "error");
      setResults([]);
    }
  };

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
            value={query}
            onChange={(event) => handleSearch(event.target.value)}
          />
          <List sx={{ mt: 2 }}>
            {results.map((item) => (
              <ListItem key={item._id}>
                <ListItemText primary={item.name} secondary={`SKU: ${item.sku}`} />
              </ListItem>
            ))}
          </List>
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

export default SearchPage;
