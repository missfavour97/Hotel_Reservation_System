import React from "react";
import { Container, Typography, Box } from "@mui/material";

function RoomDetails() {
  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
        Room Details
      </Typography>

      <Box>
        <Typography variant="body1">
          Room image gallery, amenities, booking information, and membership discounts will appear here.
        </Typography>
      </Box>
    </Container>
  );
}

export default RoomDetails;