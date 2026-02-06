import React from "react";
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import TopBar from "../components/TopBar";

const HelpPage = () => (
  <Box>
    <TopBar title="Help & Support" />
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">How can we help?</Typography>
        <Typography variant="body2" color="text.secondary">
          Quick guides for JOAP Hardware internal workflows.
        </Typography>
        <List sx={{ mt: 2 }}>
          <ListItem>
            <ListItemText primary="Logging payments" secondary="Payments are direct save; they immediately post to accounting." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Inventory corrections" secondary="Use adjusting entries instead of editing past logs." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Accounting reversals" secondary="Use reversal entries to undo mistakes." />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  </Box>
);

export default HelpPage;
