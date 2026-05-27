import React from "react";
import { Box, Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";

function BrandLogo({ showLocation = false, color = "inherit" }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.2,
        color,
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          boxShadow: "0 8px 20px rgba(36, 83, 106, 0.22)",
          flex: "0 0 auto",
        }}
      >
        <ApartmentIcon fontSize="small" />
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          component="span"
          sx={{
            display: "block",
            fontWeight: 800,
            fontSize: { xs: "1.25rem", sm: "1.35rem" },
            lineHeight: 1,
            letterSpacing: 0,
          }}
        >
          LuxeStay
        </Typography>
        {showLocation && (
          <Typography
            component="span"
            color="text.secondary"
            sx={{
              display: "block",
              fontSize: "0.78rem",
              lineHeight: 1.2,
              mt: 0.35,
            }}
          >
            Istanbul
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default BrandLogo;
