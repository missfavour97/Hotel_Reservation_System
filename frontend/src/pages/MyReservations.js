import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Chip,
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { cancelBooking, getUserBookings } from "../services/bookingService";
import { formatDate } from "../utils/format";

function MyReservations() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(Boolean(user));
  const [error, setError] = useState("");

  const loadReservations = useCallback(async () => {
    if (!user?.id) {
      return;
    }

    try {
      setLoading(true);
      setReservations(await getUserBookings(user.id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  async function handleCancel(id) {
    try {
      await cancelBooking(id);
      await loadReservations();
    } catch (err) {
      setError(err.message);
    }
  }

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert
          severity="info"
          action={
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          }
        >
          Please log in to view reservations.
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 6, mb: 8 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ mb: 5 }}
      >
        My Reservations
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : reservations.length === 0 ? (
        <Alert severity="info">No reservations found.</Alert>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {reservations.map((reservation) => (
            <Paper
              key={reservation.id}
              sx={{ p: { xs: 2.5, md: 3 }, border: 1, borderColor: "divider" }}
              elevation={0}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", md: "center" }}
                spacing={2}
              >
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="h5" fontWeight="bold">
                  {reservation.roomTitle}
                    </Typography>
                    <Chip size="small" label={reservation.status} color={reservation.status === "Cancelled" ? "default" : "primary"} />
                  </Stack>
                  <Typography color="text.secondary">
                    {formatDate(reservation.checkInDate)} to {formatDate(reservation.checkOutDate)}
                  </Typography>
                  <Typography color="text.secondary">
                    Guest: {reservation.fullName} - {reservation.guests} guest(s)
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="error"
                  disabled={reservation.status === "Cancelled"}
                  onClick={() => handleCancel(reservation.id)}
                >
                  Cancel
                </Button>
              </Stack>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default MyReservations;
