import React, { useEffect, useState } from "react";
import { Typography, Container, Box } from "@mui/material";

import RoomCard from "../components/RoomCard";
import { getRooms } from "../services/roomService";

import deluxeImage from "../assets/rooms/deluxe/deluxe2.jpg";
import standardImage from "../assets/rooms/standard/standard1.jpeg";
import executiveImage from "../assets/rooms/executive/executive1.jpeg";
import doubleBedImage from "../assets/rooms/doublebed/double_bed1.jpeg";
import presidentialImage from "../assets/rooms/presidential/presidential1.jpeg";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const data = await getRooms();

        const mappedRooms = data.map((room) => {
          let image;

          switch (room.title) {
            case "Standard Room":
              image = standardImage;
              break;

            case "Double Bed Room":
              image = doubleBedImage;
              break;

            case "Deluxe Room":
              image = deluxeImage;
              break;

            case "Executive Room":
              image = executiveImage;
              break;

            case "Presidential Suite":
              image = presidentialImage;
              break;

            default:
              image = standardImage;
          }

          return {
            ...room,
            image,
          };
        });

        setRooms(mappedRooms);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRooms();
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        marginTop: 5,
        px: { xs: 2, md: 8 },
      }}
    >
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 4 }}>
        LuxeStay Rooms and Suites
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {rooms.map((room, index) => (
          <Box key={index}>
            <RoomCard
              image={room.image}
              title={room.title}
              price={room.price}
              description={room.description}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Rooms;