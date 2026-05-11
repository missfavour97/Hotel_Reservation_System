import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ImageGallery from "../components/ImageGallery";
import { useParams } from "react-router-dom";

import presidentialMain from "../assets/rooms/presidential/presidential1.jpeg";
import presidentialBath from "../assets/rooms/presidential/presidential1_bath.jpeg";
import presidentialLiving from "../assets/rooms/presidential/presidential1_liv.jpeg";

function RoomDetails() {
  const { roomId } = useParams();

  const galleryImages = [
    presidentialMain,
    presidentialBath,
    presidentialLiving,
  ];

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
        Presidential Suite
      </Typography>

      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Exclusive luxury suite with premium amenities and executive comfort.
      </Typography>

      <ImageGallery images={galleryImages} />

      <Box>
        <Typography variant="h5" fontWeight="bold">
          $600 / night
        </Typography>
      </Box>
    </Container>
  );
}

export default RoomDetails;