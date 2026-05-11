import React from "react";
import Navbar from "../components/Navbar";
import { Container, Typography, Button, Box } from "@mui/material";

function Home() {
  return (
    <>
      <Navbar />

      <Box
        sx={{
          height: "100vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Luxury Hotel Reservation
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "white",
              mb: 4,
            }}
          >
            Book premium rooms with comfort and elegance.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#1976d2",
              paddingX: 4,
              paddingY: 1.5,
            }}
          >
            Explore Rooms
          </Button>
        </Container>
      </Box>
    </>
  );
}

export default Home;