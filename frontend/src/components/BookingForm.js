import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createBooking } from "../services/bookingService";
import { getDateInputValue, getNextDateInput } from "../utils/dateInput";

function BookingForm({ room, initialBooking, onSuccess }) {
  const { user } = useAuth();
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    checkInDate: initialBooking?.checkInDate || "",
    checkOutDate: initialBooking?.checkOutDate || "",
    guests: initialBooking?.guests || 1,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((currentForm) => {
      const nextForm = {
        ...currentForm,
        [name]: value,
      };

      if (
        name === "checkInDate" &&
        nextForm.checkOutDate &&
        nextForm.checkOutDate <= value
      ) {
        nextForm.checkOutDate = "";
      }

      return nextForm;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("Please log in before booking a room.");
      return;
    }

    if (!formData.checkInDate || !formData.checkOutDate) {
      setError("Please choose check-in and check-out dates.");
      return;
    }

    if (formData.checkOutDate <= formData.checkInDate) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    try {
      setSubmitting(true);
      const booking = await createBooking({
        ...formData,
        guests: Number(formData.guests),
        roomId: room.id,
        userId: user.id,
      });
      const message = `Booking request sent for ${room.title}.`;

      setSuccessMessage(message);
      setSuccessOpen(true);
      setFormData({
        fullName: user?.fullName || "",
        email: user?.email || "",
        checkInDate: initialBooking?.checkInDate || "",
        checkOutDate: initialBooking?.checkOutDate || "",
        guests: initialBooking?.guests || 1,
      });
      setSubmitting(false);
      onSuccess?.({ booking, message });
    } catch (error) {
      setError(error.message);
      setSubmitting(false);
    }
  }

  if (!room) {
    return null;
  }

  const todayInput = getDateInputValue(new Date());
  const checkOutMin = getNextDateInput(formData.checkInDate || todayInput);

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

        <Typography variant="h6" color="text.secondary">
          Selected Room: {room.title}
        </Typography>

        {!user && (
          <Alert
            severity="info"
            action={
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            }
          >
            A member account is required to save and manage reservations.
          </Alert>
        )}

        {error && <Alert severity="error">{error}</Alert>}

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

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Check-in Date"
            name="checkInDate"
            type="date"
            value={formData.checkInDate}
            onChange={handleChange}
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: { min: todayInput },
            }}
            required
          />

          <TextField
            fullWidth
            label="Check-out Date"
            name="checkOutDate"
            type="date"
            value={formData.checkOutDate}
            onChange={handleChange}
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: { min: checkOutMin },
            }}
            required
          />
        </Stack>

        <TextField
          label="Guests"
          name="guests"
          type="number"
          value={formData.guests}
          onChange={handleChange}
          slotProps={{ htmlInput: { min: 1, max: room.capacity || 8 } }}
          required
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!user || submitting}
        >
          {submitting ? "Saving..." : "Book Now"}
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
          {successMessage || "Booking successful!"}
        </Alert>
      </Snackbar>
    </>
  );
}

export default BookingForm;
