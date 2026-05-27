import React, { useState } from "react";
import { Box, Dialog, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ImageGallery({ images = [] }) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  function handleOpen(index) {
    setSelectedImage(index);
    setOpen(true);
  }

  function handleNext() {
    setSelectedImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }

  function handlePrev() {
    setSelectedImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }

  if (!images.length) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.6fr 1fr" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box
          component="img"
          src={images[0]}
          alt="Main room"
          onClick={() => handleOpen(0)}
          sx={{
            width: "100%",
            height: { xs: 320, sm: 440, md: 540 },
            objectFit: "cover",
            borderRadius: 2,
            cursor: "pointer",
          }}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 2,
          }}
        >
          {images.slice(1, 3).map((image, index) => (
            <Box
              key={image}
              component="img"
              src={image}
              alt="Room view"
              onClick={() => handleOpen(index + 1)}
              sx={{
                width: "100%",
                height: { xs: 180, md: 262 },
                objectFit: "cover",
                borderRadius: 2,
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xl"
        fullWidth
      >
        <Box
          sx={{
            position: "relative",
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "90vh",
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              color: "white",
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>

          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: 20,
              color: "white",
              zIndex: 10,
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <Box
            component="img"
            src={images[selectedImage]}
            alt="Expanded room"
            sx={{
              width: "90%",
              maxHeight: "85vh",
              objectFit: "contain",
            }}
          />

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 20,
              color: "white",
              zIndex: 10,
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Dialog>
    </>
  );
}

export default ImageGallery;
