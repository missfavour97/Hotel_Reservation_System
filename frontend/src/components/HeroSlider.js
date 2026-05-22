import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import { Link } from "react-router-dom";

import hero1 from "../assets/hero/hero1.jpeg";
import hero2 from "../assets/hero/hero2.jpeg";
import hero3 from "../assets/hero/hero3.jpeg";

const images = [hero1, hero2, hero3];

function HeroSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  const { user, logout } = useAuth();

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
        position: "relative",
      }}
    >
      {/* DARK OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.35)",
        }}
      />

      {/* TOP NAVBAR */}
      <Box
        sx={{
          position: "absolute",
          top: 30,
          left: 0,
          width: "100%",
          px: 5,
          zIndex: 5,
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          LuxeStay
        </Typography>

        <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
          <Typography>Hotels & Resorts</Typography>

          <Typography
            component={Link}
            to="/rooms"
            sx={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Rooms & Suites
          </Typography>

          <Typography>Restaurants</Typography>

          <Typography>Wellness</Typography>

          <Typography>Events</Typography>

          {user ? (
            <>
              <Typography>
                {user.fullName || user.email}
              </Typography>

              <Button
                color="inherit"
                component={Link}
                to="/my-reservations"
              >
                My Reservations
              </Button>

              <Button
                color="inherit"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>

              <Button
                variant="contained"
                component={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* HERO CONTENT */}
      <Box
        sx={{
          position: "absolute",
          left: 60,
          bottom: 170,
          zIndex: 3,
          color: "white",
        }}
      >
        <Typography variant="h2" fontWeight="400" sx={{ mb: 2 }}>
          LuxeStay Istanbul
        </Typography>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography
            component={Link}
            to="/rooms"
            sx={{
              color: "white",
              textDecoration: "underline",
            }}
          >
            Rooms & Suites
          </Typography>

          <Typography
            sx={{
              color: "white",
              textDecoration: "underline",
            }}
          >
            Contact Us
          </Typography>
        </Box>
      </Box>

      {/* BOOKING BAR */}
      <Paper
        elevation={6}
        sx={{
          position: "absolute",
          left: "50%",
          bottom: 35,
          transform: "translateX(-50%)",
          width: "82%",
          minHeight: 90,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          zIndex: 4,
        }}
      >
        <Box sx={{ flex: 1, px: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Dates
          </Typography>

          <Typography variant="h6">
            Entry - Exit
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ flex: 1, px: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Room and Guests
          </Typography>

          <Typography variant="h6">
            1 Adult, 0 Children
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ flex: 1, px: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Code
          </Typography>

          <Typography variant="h6">
            Enter the code
          </Typography>
        </Box>

        <Box sx={{ width: 280, p: 1.5 }}>
          <Button
            variant="contained"
            fullWidth
            component={Link}
            to="/rooms"
            sx={{
              height: 64,
              backgroundColor: "#26313f",
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1d2631",
              },
            }}
          >
            Find a Room
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default HeroSlider;