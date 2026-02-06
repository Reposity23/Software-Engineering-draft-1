import React from "react";
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

const Help = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Help Center
      </Typography>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Quick Guides
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Create an order and reserve stock"
                secondary="Orders module -> Create Order -> Save"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Log a GCash payment"
                secondary="Billing & Payment -> Enter reference -> Save Payment"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Reverse an accounting entry"
                secondary="Accounting -> Reverse Entry"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Help;
