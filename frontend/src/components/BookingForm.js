import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";

function BookingForm() {
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
          roomId: 1,
        }),
      });

      if (response.ok) {
        alert("Booking successful!");

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Book This Room
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

      <TextField
        label="Check-In Date"
        name="checkInDate"
        type="date"
        value={formData.checkInDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />

      <TextField
        label="Check-Out Date"
        name="checkOutDate"
        type="date"
        value={formData.checkOutDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />

      <TextField
        label="Guests"
        name="guests"
        type="number"
        value={formData.guests}
        onChange={handleChange}
        required
      />

      <Button type="submit" variant="contained" size="large">
        Reserve Now
      </Button>
    </Box>
  );
}

export default BookingForm;