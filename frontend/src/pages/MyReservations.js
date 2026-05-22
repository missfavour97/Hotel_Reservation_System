import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";

import { useAuth } from "../context/AuthContext";

function MyReservations() {
  const { user } = useAuth();

  const reservations =
    JSON.parse(localStorage.getItem("reservations")) || [];

  const userReservations = reservations.filter(
    (reservation) => reservation.userEmail === user?.email
  );

  return (
    <Container sx={{ mt: 6, mb: 8 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ mb: 5 }}
      >
        My Reservations
      </Typography>

      {userReservations.length === 0 ? (
        <Typography variant="h6">
          No reservations found.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {userReservations.map((reservation, index) => (
            <Card key={index} sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  {reservation.roomTitle}
                </Typography>

                <Typography sx={{ mb: 1 }}>
                  Guest: {reservation.fullName}
                </Typography>

                <Typography sx={{ mb: 1 }}>
                  Email: {reservation.email}
                </Typography>

                <Typography sx={{ mb: 1 }}>
                  Check-in: {reservation.checkInDate}
                </Typography>

                <Typography sx={{ mb: 1 }}>
                  Check-out: {reservation.checkOutDate}
                </Typography>

                <Typography>
                  Guests: {reservation.guests}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default MyReservations;