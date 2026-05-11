import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import hero1 from "../assets/hero/hero1.jpeg";
import hero2 from "../assets/hero/hero2.jpeg";
import hero3 from "../assets/hero/hero3.jpeg";

const images = [hero1, hero2, hero3];

function HeroSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          color: "white",
          px: 10,
        }}
      >
        <Typography variant="h2" fontWeight="bold" mb={2}>
          Luxury Hotel Experience
        </Typography>

        <Typography variant="h5" mb={4}>
          Discover elegance, comfort, and premium hospitality.
        </Typography>

        <Button variant="contained" size="large" component={Link} to="/rooms">
          Explore Rooms
        </Button>
      </Box>
    </Box>
  );
}

export default HeroSlider;