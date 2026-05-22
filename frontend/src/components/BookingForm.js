import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";

function BookingForm({ roomTitle, roomId }) {
  const [successOpen, setSuccessOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5230/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          roomId: roomId,
        }),
      });

      if (true) {
        setSuccessOpen(true);
        const existingReservations =
        JSON.parse(localStorage.getItem("reservations")) || [];

    const currentUser =
      JSON.parse(localStorage.getItem("hotelUser"));

    const newReservation = {
     ...formData,
     roomTitle,
     roomId,
     userEmail: currentUser?.email,
  };

   localStorage.setItem(
     "reservations",
     JSON.stringify([
     ...existingReservations,
     newReservation,
      ])
  );

        setFormData({
          fullName: "",
          email: "",
          checkInDate: "",
          checkOutDate: "",
          guests: 1,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Book This Room
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
        >
          Selected Room: {roomTitle}
        </Typography>

        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            type="date"
            helperText="Check-in Date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            type="date"
            helperText="Check-out Date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
          />
        </Box>

        <TextField
          label="Guests"
          name="guests"
          type="number"
          value={formData.guests}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
        >
          Book Now
        </Button>
      </Box>

      <Snackbar
        open={successOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessOpen(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessOpen(false)}
        >
          Booking successful!
        </Alert>
      </Snackbar>
    </>
  );
}

export default BookingForm;