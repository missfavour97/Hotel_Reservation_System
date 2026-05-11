import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import RoomCard from "../components/RoomCard";
import deluxeImage from "../assets/rooms/deluxe/deluxe2.jpeg";

function Rooms() {
  const rooms = [
    {
      title: "Standard Room",
      price: 80,
      description: "Comfortable and affordable room for regular guests.",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
    },
    {
      title: "Deluxe Room",
      price: 180,
      description: "Spacious room with elegant interior and premium comfort.",
      image: deluxeImage,
    },
    {
      title: "Executive Room",
      price: 300,
      description: "Luxury room designed for business and VIP guests.",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
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