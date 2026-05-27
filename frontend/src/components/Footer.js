import React from "react";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link as MuiLink,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BrandLogo from "./BrandLogo";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
        mt: 8,
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1.4fr 0.8fr 0.8fr 1.2fr",
            },
            gap: 4,
          }}
        >
          <Box>
            <Box sx={{ mb: 1.5 }}>
              <BrandLogo showLocation />
            </Box>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              A modern city hotel for relaxed stays, business travel, and
              memorable weekends near Istanbul's cultural heart.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton aria-label="Facebook" color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Instagram" color="primary">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" color="primary">
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 700 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {[
                ["Home", "/"],
                ["Rooms & Suites", "/rooms"],
                ["My Reservations", "/my-reservations"],
                ["Complaints & Requests", "/requests"],
              ].map(([label, to]) => (
                <MuiLink
                  key={to}
                  component={RouterLink}
                  to={to}
                  color="text.secondary"
                  underline="hover"
                >
                  {label}
                </MuiLink>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 700 }}>
              Contact
            </Typography>
            <Stack spacing={1.2} color="text.secondary">
              <Stack direction="row" spacing={1.2}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">Sultanahmet, Istanbul</Typography>
              </Stack>
              <Stack direction="row" spacing={1.2}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">+90 212 555 0184</Typography>
              </Stack>
              <Stack direction="row" spacing={1.2}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">hello@luxestay.edu</Typography>
              </Stack>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 700 }}>
              Stay Updated
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Receive seasonal offers and hotel announcements.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row", md: "column" }} spacing={1.2}>
              <TextField size="small" label="Email address" />
              <Button variant="contained">Subscribe</Button>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" color="text.secondary">
          (c) 2026 LuxeStay Istanbul.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
