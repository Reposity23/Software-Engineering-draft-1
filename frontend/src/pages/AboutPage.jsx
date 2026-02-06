import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import TopBar from "../components/TopBar";

const AboutPage = () => (
  <Box>
    <TopBar title="About" />
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">JOAP Hardware Trading</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          A collaborative supplier management and accounting system built to replace manual
          spreadsheets with an integrated workflow.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          This MVP demonstrates direct-save billing, append-only inventory and accounting,
          and a modern dashboard experience for internal teams.
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default AboutPage;
