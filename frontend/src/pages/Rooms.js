import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import RoomCard from "../components/RoomCard";
import deluxeImage from "../assets/rooms/deluxe/deluxe2.jpg";
import standardImage from "../assets/rooms/standard/standard1.jpeg";
import executiveImage from "../assets/rooms/executive/executive1.jpeg";

function Rooms() {
  const rooms = [
    {
      title: "Standard Room",
      price: 250,
      description: "Comfortable and affordable room for regular guests.",
      image: standardImage,
    },
    {
      title: "Deluxe Room",
      price: 500,
      description: "Spacious room with elegant interior and premium comfort.",
      image: deluxeImage,
    },
    {
      title: "Executive Room",
      price: 750,
      description: "Luxury room designed for business and VIP guests.",
      image: executiveImage,
    },
  ];

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 4 }}>
        Our Rooms
      </Typography>

      <Grid container spacing={4}>
        {rooms.map((room, index) => (
          <Grid item xs={12} md={4} key={index}>
            <RoomCard
              image={room.image}
              title={room.title}
              price={room.price}
              description={room.description}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Rooms;