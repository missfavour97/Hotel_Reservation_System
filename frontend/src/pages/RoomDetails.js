import React, { useEffect, useState } from "react";
import ImageGallery from "../components/ImageGallery";
import {
  Alert,
  CircularProgress,
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";

import BookingForm from "../components/BookingForm";
import { getRooms } from "../services/roomService";
import { formatCurrency } from "../utils/format";
import { getBookingDefaults } from "../utils/bookingSearch";
import { getRoomVisuals, parseAmenities, slugify } from "../data/roomAssets";

function RoomDetails() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRoom() {
      try {
        setRooms(await getRooms());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadRoom();
  }, []);

  const room = rooms.find((candidate) => slugify(candidate.title) === roomId);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!room) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4">Room not found</Typography>
      </Container>
    );
  }

  const visuals = getRoomVisuals(room);
  const amenities = parseAmenities(room.amenities);
  const bookingDefaults = getBookingDefaults(searchParams);

  return (
    <Container sx={{ mt: 5, mb: 8 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={3}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
            {room.title}
          </Typography>

          <Typography variant="h6" color="text.secondary">
            {room.description}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" color="primary">
            {formatCurrency(room.price)} / night
          </Typography>
        </Box>
      </Stack>

      <ImageGallery images={visuals.images} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
          gap: 4,
          alignItems: "start",
        }}
      >
        <Box>
          <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
            <Chip label={`${room.capacity || 2} guests`} />
            <Chip label={room.bedType || "King Bed"} />
            <Chip label={room.size || "Room"} />
          </Stack>

          <Typography variant="h5" sx={{ mb: 2 }}>
            Amenities
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 1.5,
            }}
          >
            {amenities.map((amenity) => (
              <Paper key={amenity} sx={{ p: 2, border: 1, borderColor: "divider" }} elevation={0}>
                <Typography>{amenity}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        <Paper sx={{ p: { xs: 2.5, md: 3 }, border: 1, borderColor: "divider" }} elevation={0}>
          {showBookingForm ? (
            <BookingForm room={room} initialBooking={bookingDefaults} />
          ) : (
            <Stack spacing={2}>
              <Typography variant="h5">Ready to reserve?</Typography>
              <Typography color="text.secondary">
                Choose your dates and submit a reservation request.
              </Typography>
              <Button variant="contained" size="large" onClick={() => setShowBookingForm(true)}>
                Book Room
              </Button>
            </Stack>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default RoomDetails;
