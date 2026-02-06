import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import api from "../utils/api";

const Search = () => {
  const [mode, setMode] = useState("id");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (mode === "id") {
      api
        .get(`/api/search/by-id/${query}`)
        .then((res) => setResults([res.data]))
        .catch(() => setResults([]));
    } else {
      api
        .get("/api/search/by-name", { params: { prefix: query } })
        .then((res) => setResults(res.data))
        .catch(() => setResults([]));
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Search
      </Typography>
      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(event, value) => value && setMode(value)}
            sx={{ mb: 2 }}
          >
            <ToggleButton value="id">Search by ID</ToggleButton>
            <ToggleButton value="name">Search by Name</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            label={mode === "id" ? "SKU" : "Product Name Prefix"}
            fullWidth
            margin="dense"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSearch}>
            Run Search
          </Button>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Results
          </Typography>
          <List>
            {results.map((item) => (
              <ListItem key={item._id}>
                <ListItemText primary={item.name} secondary={`SKU: ${item.sku}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Search;
