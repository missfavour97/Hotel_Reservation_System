import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import ImageGallery from "../components/ImageGallery";

// STANDARD
import standardMain from "../assets/rooms/standard/standard1.jpeg";
import standardBath from "../assets/rooms/standard/standard1_bath.jpeg";

// DOUBLE BED
import doubleMain from "../assets/rooms/doublebed/double_bed1.jpeg";
import doubleBath from "../assets/rooms/doublebed/double1_bath.jpeg";

// DELUXE
import deluxeMain from "../assets/rooms/deluxe/deluxe2.jpg";
import deluxeBath from "../assets/rooms/deluxe/deluxe2_bath.jpeg";

// EXECUTIVE
import executiveMain from "../assets/rooms/executive/executive1.jpeg";
import executiveBath from "../assets/rooms/executive/executive1_bath.jpeg";

// PRESIDENTIAL
import presidentialMain from "../assets/rooms/presidential/presidential1.jpeg";
import presidentialBath from "../assets/rooms/presidential/presidential1_bath.jpeg";
import presidentialLiving from "../assets/rooms/presidential/presidential1_liv.jpeg";

function RoomDetails() {
  const { roomId } = useParams();

  const rooms = {
    "standard-room": {
      title: "Standard Room",
      price: 80,
      description: "Comfortable and affordable room for regular guests.",
      images: [standardMain, standardBath],
    },

    "double-bed-room": {
      title: "Double Bed Room",
      price: 120,
      description:
        "A comfortable room with double bed space, ideal for couples or friends.",
      images: [doubleMain, doubleBath],
    },

    "deluxe-room": {
      title: "Deluxe Room",
      price: 180,
      description:
        "Spacious room with elegant interior and premium comfort.",
      images: [deluxeMain, deluxeBath],
    },

    "executive-room": {
      title: "Executive Room",
      price: 300,
      description:
        "Luxury room designed for business and VIP guests.",
      images: [executiveMain, executiveBath],
    },

    "presidential-suite": {
      title: "Presidential Suite",
      price: 600,
      description:
        "Exclusive luxury suite with premium amenities and executive comfort.",
      images: [presidentialMain, presidentialBath, presidentialLiving],
    },
  };

  const room = rooms[roomId];

  if (!room) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4">
          Room not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
        {room.title}
      </Typography>

      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        {room.description}
      </Typography>

      <ImageGallery images={room.images} />

      <Box>
        <Typography variant="h5" fontWeight="bold">
          ${room.price} / night
        </Typography>
      </Box>
    </Container>
  );
}

export default RoomDetails;