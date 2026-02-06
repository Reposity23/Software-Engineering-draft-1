import React from "react";
import { Box, Card, CardContent, Typography, Grid, LinearProgress } from "@mui/material";
import TopBar from "../components/TopBar";

const ReportsPage = () => (
  <Box>
    <TopBar title="Reports" />
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Sales Summary</Typography>
            <Typography variant="body2" color="text.secondary">
              Today vs yesterday sales volume.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2">Today</Typography>
              <LinearProgress variant="determinate" value={70} sx={{ height: 10, borderRadius: 5 }} />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Yesterday
              </Typography>
              <LinearProgress
                variant="determinate"
                value={45}
                color="secondary"
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Inventory Movements</Typography>
            <Typography variant="body2" color="text.secondary">
              Stock in/out trend (chart placeholder).
            </Typography>
            <Box sx={{ mt: 3, height: 160, backgroundColor: "#e2e8f0", borderRadius: 2 }} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Advanced Analytics</Typography>
        <Typography variant="body2" color="text.secondary">
          ARIMA demand forecasting will be available in a future enhancement.
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default ReportsPage;
