import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

import RoomCard from "../components/RoomCard";
import { getRooms } from "../services/roomService";
import {
  buildBookingSearchFromParams,
  getBookingDefaults,
} from "../utils/bookingSearch";

function Rooms() {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("priceAsc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRooms() {
      try {
        setRooms(await getRooms());
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  const filteredRooms = rooms
    .filter((room) =>
      `${room.title} ${room.description} ${room.bedType}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "priceDesc") {
        return b.price - a.price;
      }

      if (sort === "capacityDesc") {
        return b.capacity - a.capacity;
      }

      return a.price - b.price;
    });
  const bookingDefaults = getBookingDefaults(searchParams);
  const bookingSearch = buildBookingSearchFromParams(searchParams);

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "flex-end" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
            Rooms and Suites
          </Typography>
          <Typography color="text.secondary">
            Choose a stay that matches your schedule, group size, and comfort level.
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Search rooms"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <TextField
            select
            label="Sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="priceAsc">Price: low to high</MenuItem>
            <MenuItem value="priceDesc">Price: high to low</MenuItem>
            <MenuItem value="capacityDesc">Capacity</MenuItem>
          </TextField>
        </Stack>
      </Stack>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && filteredRooms.length === 0 && (
        <Alert severity="info">No rooms match your search.</Alert>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            initialBooking={bookingDefaults}
            bookingSearch={bookingSearch}
          />
        ))}
      </Box>
    </Container>
  );
}

export default Rooms;
