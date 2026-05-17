import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useParams } from "react-router-dom";

import ImageGallery from "../components/ImageGallery";
import BookingForm from "../components/BookingForm";

// STANDARD
import standardMain from "../assets/rooms/standard/standard1.jpeg";
import standardBath from "../assets/rooms/standard/standard1_bath.jpeg";

// DOUBLE BED
import doubleMain from "../assets/rooms/doublebed/double_bed1.jpeg";
import doubleBath from "../assets/rooms/doublebed/double1_bath.jpeg";

// DELUXE
import deluxeMain from "../assets/rooms/deluxe/deluxe2.jpg";
import deluxeBath from "../assets/rooms/deluxe/deluxe2_bath.jpeg";

// EXECUTIVE
import executiveMain from "../assets/rooms/executive/executive1.jpeg";
import executiveBath from "../assets/rooms/executive/executive1_bath.jpeg";

// PRESIDENTIAL
import presidentialMain from "../assets/rooms/presidential/presidential1.jpeg";
import presidentialBath from "../assets/rooms/presidential/presidential1_bath.jpeg";
import presidentialLiving from "../assets/rooms/presidential/presidential1_liv.jpeg";

function RoomDetails() {
  const { roomId } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);

  const completeAmenities = {
    comfortAndSleep: [
      "High-quality mattress and pillows",
      "Blackout curtains and good light-blocking",
      "Soundproofing and quiet rooms",
      "Good temperature control (AC/heat)",
      "Premium linens and towels",
      "Wi-Fi that’s fast and stable",
    ],
    convenience: [
      "24/7 front desk",
      "On-site parking",
      "Elevator access and mobility-friendly features",
      "In-room desk and charging stations",
      "Room service",
      "Laundry facilities",
    ],
    foodAndDrinks: [
      "Free breakfast with hot and healthy options",
      "Restaurant and bar on-site",
      "Coffee and tea available in the lobby",
      "Free bottled water and refill stations",
    ],
    practicalExtras: [
      "Good water pressure and strong shower",
      "Hair dryer and quality toiletries",
      "Iron and ironing board",
      "Safe large enough for a laptop",
      "Refrigerator or mini-fridge",
      "Blackout and privacy curtains",
    ],
  };

  const rooms = {
    "standard-room": {
      title: "Standard Room",
      price: 250,
      description: "Comfortable and affordable room for regular guests.",
      images: [standardMain, standardBath],
      amenities: completeAmenities,
    },

    "double-bed-room": {
      title: "Double Bed Room",
      price: 300,
      description:
        "A comfortable room with double bed space, ideal for couples or friends.",
      images: [doubleMain, doubleBath],
      amenities: completeAmenities,
    },

    "deluxe-room": {
      title: "Deluxe Room",
      price: 500,
      description:
        "Spacious room with elegant interior and premium comfort.",
      images: [deluxeMain, deluxeBath],
      amenities: completeAmenities,
    },

    "executive-room": {
      title: "Executive Room",
      price: 700,
      description: "Luxury room designed for business and VIP guests.",
      images: [executiveMain, executiveBath],
      amenities: completeAmenities,
    },

    "presidential-suite": {
      title: "Presidential Suite",
      price: 1200,
      description:
        "Exclusive luxury suite with premium amenities and executive comfort.",
      images: [presidentialMain, presidentialBath, presidentialLiving],
      amenities: completeAmenities,
    },
  };

  const room = rooms[roomId];

  if (!room) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4">Room not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5, mb: 8 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
        {room.title}
      </Typography>

      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        {room.description}
      </Typography>

      <ImageGallery images={room.images} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          ${room.price} / night
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Room Amenities
        </Typography>

        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          COMFORT AND SLEEP
        </Typography>

        <List>
          {room.amenities.comfortAndSleep.map((amenity, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={`• ${amenity}`} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mb: 1 }}>
          CONVENIENCE
        </Typography>

        <List>
          {room.amenities.convenience.map((amenity, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={`• ${amenity}`} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mb: 1 }}>
          FOOD AND DRINKS
        </Typography>

        <List>
          {room.amenities.foodAndDrinks.map((amenity, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={`• ${amenity}`} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mb: 1 }}>
          PRACTICAL EXTRAS
        </Typography>

        <List>
          {room.amenities.practicalExtras.map((amenity, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={`• ${amenity}`} />
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          size="large"
          sx={{ mt: 4 }}
          onClick={() => setShowBookingForm(true)}
        >
          Book Room
        </Button>
      </Box>

      {showBookingForm && <BookingForm />}
    </Container>
  );
}

export default RoomDetails;