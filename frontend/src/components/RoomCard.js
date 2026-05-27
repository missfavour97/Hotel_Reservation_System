import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Dialog,
  DialogContent,
  Chip,
  Stack,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";

import { Link } from "react-router-dom";
import BookingForm from "./BookingForm";
import { formatCurrency } from "../utils/format";
import { getRoomVisuals, parseAmenities, slugify } from "../data/roomAssets";

function RoomCard({ room, initialBooking, bookingSearch = "" }) {
  const [openBooking, setOpenBooking] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const visuals = getRoomVisuals(room);
  const highlights = parseAmenities(room.amenities).slice(0, 3);

  function handleBookingSuccess({ message }) {
    setOpenBooking(false);
    setSuccessMessage(message || `Booking request sent for ${room.title}.`);
    setSuccessOpen(true);
  }

  return (
    <>
      <Card
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.12fr) minmax(360px, 0.88fr)" },
          overflow: "hidden",
          width: "100%",
          minHeight: { xs: "auto", md: 420 },
          border: 1,
          borderColor: "divider",
          boxShadow: 0,
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 260, sm: 360, md: 460 },
            bgcolor: "background.default",
          }}
        >
          <CardMedia
            component="img"
            image={visuals.image}
            alt={room.title}
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              inset: 0,
              objectFit: "cover",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: 0,
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mb: 2,
                flexWrap: "wrap",
                rowGap: 1,
              }}
            >
              <Chip size="small" icon={<PeopleAltOutlinedIcon />} label={`${room.capacity || 2} guests`} />
              <Chip size="small" icon={<BedOutlinedIcon />} label={room.bedType || "King Bed"} />
              <Chip size="small" icon={<SquareFootOutlinedIcon />} label={room.size || "Room"} />
            </Stack>

            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                mb: 1.5,
                fontSize: { xs: "1.55rem", md: "1.9rem" },
                lineHeight: 1.15,
              }}
            >
              {room.title}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 2.5,
                lineHeight: 1.7,
              }}
            >
              {room.description}
            </Typography>

            <Divider sx={{ mb: 2.5 }} />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr" },
                gap: 1,
                mb: 3,
              }}
            >
              {highlights.map((amenity) => (
                <Typography key={amenity} color="text.secondary" variant="body2">
                  - {amenity}
                </Typography>
              ))}
            </Box>

            <Typography
              variant="h5"
              color="primary"
              fontWeight="bold"
            >
              {formatCurrency(room.price)} / night
            </Typography>
          </CardContent>

          <CardActions
            sx={{
              px: { xs: 2.5, sm: 3, md: 4 },
              pb: { xs: 2.5, sm: 3, md: 4 },
              pt: { xs: 0, md: 1 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => setOpenBooking(true)}
              sx={{
                px: 3,
                py: 1.35,
                fontSize: "1rem",
              }}
            >
              Book Now
            </Button>

            <Button
              variant="outlined"
              component={Link}
              to={`/rooms/${slugify(room.title)}${bookingSearch}`}
              sx={{
                px: 3,
                py: 1.35,
                fontSize: "1rem",
              }}
            >
              View Details
            </Button>
          </CardActions>
        </Box>
      </Card>

      <Dialog
        open={openBooking}
        onClose={() => setOpenBooking(false)}
        maxWidth="md"
        fullWidth
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
          }}
        >
          <IconButton onClick={() => setOpenBooking(false)} aria-label="Close booking form">
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
          <BookingForm
            room={room}
            initialBooking={initialBooking}
            onSuccess={handleBookingSuccess}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={successOpen}
        autoHideDuration={5000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessOpen(false)}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default RoomCard;
