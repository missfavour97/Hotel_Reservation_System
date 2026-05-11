import React from "react";
import { Box } from "@mui/material";

function ImageGallery({ images }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
        gap: 2,
        mb: 4,
      }}
    >
      <Box
        component="img"
        src={images[0]}
        alt="Main room"
        sx={{
          width: "100%",
          height: 420,
          objectFit: "cover",
          borderRadius: 3,
        }}
      />

      <Box sx={{ display: "grid", gap: 2 }}>
        {images.slice(1, 3).map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`Room view ${index + 1}`}
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              borderRadius: 3,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ImageGallery;