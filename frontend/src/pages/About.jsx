import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const About = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        About JOAP Hardware Trading
      </Typography>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Supplier Management & Accounting System
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            This platform unifies supplier, inventory, order, billing, and accounting workflows
            into a modern dashboard experience for JOAP Hardware Trading.
          </Typography>
          <Typography color="text.secondary">
            Built with React, Node.js, and MongoDB following direct-save and append-only
            workflows for audit-ready operations.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;
