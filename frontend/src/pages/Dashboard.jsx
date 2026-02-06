import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import api from "../utils/api";

const Dashboard = () => {
  const [summary, setSummary] = useState({ totalOrders: 0, totalSales: 0 });

  useEffect(() => {
    api
      .get("/api/reports/summary")
      .then((res) => setSummary(res.data))
      .catch(() => setSummary({ totalOrders: 0, totalSales: 0 }));
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Welcome back, Maria!
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Here is the latest operational snapshot for JOAP Hardware Trading.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 12px 24px rgba(15,23,42,0.08)" }}>
            <CardContent>
              <Typography color="text.secondary">Total Orders</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {summary.totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 12px 24px rgba(15,23,42,0.08)" }}>
            <CardContent>
              <Typography color="text.secondary">Total Sales</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                ₱{summary.totalSales.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 12px 24px rgba(15,23,42,0.08)" }}>
            <CardContent>
              <Typography color="text.secondary">Active Users</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                8
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 12px 24px rgba(15,23,42,0.08)" }}>
            <CardContent>
              <Typography color="text.secondary">Low Stock Alerts</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                3
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Activity
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Order ORD-1023 marked as Paid"
                    secondary="Billing & Payment - 10:40 AM"
                  />
                  <Chip label="Paid" color="success" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Inventory adjustment for Heavy Duty Drill"
                    secondary="Inventory - 9:20 AM"
                  />
                  <Chip label="Adjusting Entry" color="warning" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Supplier Manila Tools Supply updated"
                    secondary="Suppliers - 8:10 AM"
                  />
                  <Chip label="Updated" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Views
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Inventory Snapshot
                </Typography>
                <Typography color="text.secondary">12 products below reorder level</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Orders Queue
                </Typography>
                <Typography color="text.secondary">5 pending payment, 2 ready for release</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
