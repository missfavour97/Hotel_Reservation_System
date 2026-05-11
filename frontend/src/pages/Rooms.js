import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import RoomCard from "../components/RoomCard";
import deluxeImage from "../assets/rooms/deluxe/deluxe2.jpg";
import standardImage from "../assets/rooms/standard/standard1.jpeg";
import executiveImage from "../assets/rooms/executive/executive1.jpeg";
import doubleBedImage from "../assets/rooms/doublebed/double_bed1.jpeg";
import presidentialImage from "../assets/rooms/presidential/presidential1.jpeg";

function Rooms() {
  const rooms = [
    {
      title: "Standard Room",
      price: 250,
      description: "Comfortable and affordable room for regular guests.",
      image: standardImage,
    },
    {
      title: "Double Bed Room",
      price: 300,
      description: "A comfortable room with double bed space, ideal for couples or friends.",
      image: doubleBedImage,
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
    {
      title: "Presidential Suite",
      price: 1200,
      description: "Exclusive luxury suite with premium amenities and executive comfort.",
      image: presidentialImage,
  },
  ];

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 4 }}>
        Our Rooms
      </Typography>

      <Grid container spacing={4}>
        {rooms.map((room, index) => (
          <Grid item xs={12} key={index}>
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