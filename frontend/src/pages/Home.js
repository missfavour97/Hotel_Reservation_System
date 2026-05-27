import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link } from "react-router-dom";
import { getRooms } from "../services/roomService";
import { formatCurrency } from "../utils/format";
import { buildBookingSearch } from "../utils/bookingSearch";
import { getDateInputValue, getNextDateInput } from "../utils/dateInput";
import { getRoomVisuals, heroImages, parseAmenities, slugify } from "../data/roomAssets";

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [searchForm, setSearchForm] = useState({
    checkInDate: "",
    checkOutDate: "",
    guests: 2,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((current) => (current + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadRooms() {
      try {
        setRooms(await getRooms());
      } catch (err) {
        setError(err.message);
      }
    }

    loadRooms();
  }, []);

  const featuredRooms = rooms.filter((room) => room.isFeatured).slice(0, 3);
  const todayInput = getDateInputValue(new Date());
  const checkOutMin = getNextDateInput(searchForm.checkInDate || todayInput);
  const bookingSearch = buildBookingSearch(searchForm);
  const roomsSearchPath = `/rooms${bookingSearch}`;

  function handleSearchChange(event) {
    const { name, value } = event.target;

    setSearchForm((currentForm) => {
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

  return (
    <>
      <Box
        sx={{
          minHeight: { xs: "auto", md: "calc(100vh - 72px)" },
          maxHeight: { md: 760 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "flex-start", md: "center" },
          alignItems: "stretch",
          color: "white",
          backgroundImage: `linear-gradient(rgba(18, 23, 20, 0.54), rgba(18, 23, 20, 0.32)), url(${heroImages[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "center top", md: "center" },
          pb: { xs: 4, md: 0 },
        }}
      >
        <Container maxWidth="lg" sx={{ pt: { xs: 5, sm: 7, md: 10 }, pb: { xs: 3, md: 10 } }}>
          <Box sx={{ maxWidth: 720 }}>
            <Chip
              label="Istanbul hotel and suites"
              sx={{
                mb: 2,
                color: "white",
                borderColor: "rgba(255,255,255,0.65)",
              }}
              variant="outlined"
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 38, sm: 56, md: 72 },
                lineHeight: { xs: 1.08, md: 1.02 },
                mb: 2,
              }}
            >
              LuxeStay Istanbul
            </Typography>
            <Typography
              variant="h5"
              sx={{
                maxWidth: 620,
                lineHeight: 1.5,
                mb: 3,
                color: "rgba(255,255,255,0.88)",
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              Contemporary rooms, warm service, and a simple reservation
              experience for city stays.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/rooms"
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                View Rooms
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/requests"
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.7)",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Contact Desk
              </Button>
            </Stack>
          </Box>
        </Container>

        <Paper
          elevation={6}
          sx={{
            position: { xs: "relative", md: "absolute" },
            left: { xs: "auto", md: "50%" },
            bottom: { xs: "auto", md: -48 },
            transform: { xs: "none", md: "translateX(-50%)" },
            width: "min(1080px, calc(100% - 32px))",
            mx: { xs: "auto", md: 0 },
            mt: { xs: 0, md: 0 },
            p: { xs: 2, md: 2.5 },
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            <TextField
              fullWidth
              label="Check-in"
              name="checkInDate"
              type="date"
              value={searchForm.checkInDate}
              onChange={handleSearchChange}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { min: todayInput },
              }}
            />
            <TextField
              fullWidth
              label="Check-out"
              name="checkOutDate"
              type="date"
              value={searchForm.checkOutDate}
              onChange={handleSearchChange}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { min: checkOutMin },
              }}
            />
            <TextField
              fullWidth
              type="number"
              label="Guests"
              name="guests"
              value={searchForm.guests}
              onChange={handleSearchChange}
              slotProps={{ htmlInput: { min: 1 } }}
            />
            <Button
              fullWidth
              variant="contained"
              component={Link}
              to={roomsSearchPath}
              sx={{ height: 56 }}
              endIcon={<ArrowForwardRoundedIcon />}
            >
              Find a Room
            </Button>
          </Stack>
        </Paper>
      </Box>

      <Container maxWidth="lg" sx={{ pt: { xs: 5, md: 12 }, pb: 4 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" },
            alignItems: { xs: "stretch", sm: "end" },
            gap: 2.5,
            mb: 3.5,
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ mb: 1 }}>
              Featured Stays
            </Typography>
            <Typography color="text.secondary">
              Comfortable options for quick trips, business visits, and suites.
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/rooms"
            variant="outlined"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              justifySelf: { xs: "stretch", sm: "end" },
              minHeight: 44,
              px: 2.5,
              whiteSpace: "nowrap",
            }}
          >
            Browse All Rooms
          </Button>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
            },
            gap: { xs: 2, md: 3 },
          }}
        >
          {featuredRooms.map((room) => {
            const visuals = getRoomVisuals(room);
            const highlights = parseAmenities(room.amenities).slice(0, 2);

            return (
              <Paper
                key={room.id}
                component={Link}
                to={`/rooms/${slugify(room.title)}${bookingSearch}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  color: "inherit",
                  textDecoration: "none",
                  border: 1,
                  borderColor: "divider",
                  height: "100%",
                  boxShadow: 0,
                  transition: "transform 160ms ease, box-shadow 160ms ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 4,
                  },
                }}
              >
                <Box
                  component="img"
                  src={visuals.image}
                  alt={room.title}
                  sx={{
                    width: "100%",
                    height: { xs: 240, sm: 220, md: 240 },
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <Box
                  sx={{
                    p: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    flexGrow: 1,
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
                    <Chip size="small" label={`${room.capacity || 2} guests`} />
                    <Chip size="small" label={room.bedType || "King Bed"} />
                  </Stack>
                  <Box>
                    <Typography variant="h6">{room.title}</Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        mt: 0.75,
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {room.description}
                    </Typography>
                  </Box>
                  {highlights.length > 0 && (
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
                      {highlights.map((amenity) => (
                        <Chip key={amenity} size="small" variant="outlined" label={amenity} />
                      ))}
                    </Stack>
                  )}
                  <Typography color="primary" fontWeight={700} sx={{ mt: "auto" }}>
                    {formatCurrency(room.price)} / night
                  </Typography>
                </Box>
              </Paper>
            );
          })}
        </Box>
      </Container>
    </>
  );
}

export default Home;
