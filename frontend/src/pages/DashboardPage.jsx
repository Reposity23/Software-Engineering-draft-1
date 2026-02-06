import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Chip
} from "@mui/material";
import { Search } from "@mui/icons-material";
import TopBar from "../components/TopBar";

const summaryItems = [
  { label: "Total Orders", value: "128", tone: "primary" },
  { label: "Pending Payment", value: "12", tone: "warning" },
  { label: "Low Stock Alerts", value: "5", tone: "error" },
  { label: "Daily Sales", value: "₱48,200", tone: "success" }
];

const activity = [
  "Payment logged for Order JOAP-2031",
  "Inventory adjustment added for PVC Pipe",
  "Supplier Metro Hardware Hub updated",
  "Order JOAP-2030 reserved stock"
];

const DashboardPage = () => (
  <Box>
    <TopBar title="Dashboard" />
    <Box sx={{ mt: 4 }}>
      <TextField
        fullWidth
        placeholder="Search orders, products, suppliers..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />
    </Box>
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {summaryItems.map((item) => (
        <Grid item xs={12} md={3} key={item.label}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {item.value}
              </Typography>
              <Chip label="Updated just now" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6">Inventory Snapshot</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Quick glance of critical SKUs and stock movements.
            </Typography>
            <List>
              <ListItem divider>
                <ListItemText primary="Hammer 16oz" secondary="Stock: 8 · Reorder Level: 5" />
                <Chip label="Stable" color="success" />
              </ListItem>
              <ListItem divider>
                <ListItemText
                  primary="Philips Screwdriver"
                  secondary="Stock: 3 · Reorder Level: 8"
                />
                <Chip label="Low" color="warning" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="PVC Pipe 1/2 inch"
                  secondary="Stock: 12 · Reorder Level: 20"
                />
                <Chip label="Critical" color="error" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Activity Feed</Typography>
            <List>
              {activity.map((item) => (
                <ListItem key={item} divider>
                  <ListItemText primary={item} secondary="Just now" />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

export default DashboardPage;
