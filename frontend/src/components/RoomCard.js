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
} from "@mui/material";

import { Link } from "react-router-dom";
import BookingForm from "./BookingForm";

function RoomCard({ image, title, price, description, roomId }) {
  const [openBooking, setOpenBooking] = useState(false);

  return (
    <>
      <Card
        sx={{
           display: "flex",
           flexDirection: { xs: "column", md: "row" },
           mb: 5,
           borderRadius: 0,
           boxShadow: 2,
           overflow: "hidden",
           width: "100%",
           maxWidth: 1280,
           minHeight: 260,
           mx: "auto",
           backgroundColor: "#fff",
        }}
    >
        {/* ROOM IMAGE */}
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
                width: { xs: "100%", md: "48%" },
                height: { xs: 260, md: 320 },
                objectFit: "cover",
              
          }}
        />

        {/* ROOM DETAILS */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            flex: 1,
          }}
        >
          <CardContent 
          sx={{ 
             px: 4, 
             pt: 4, 
             pb: 2,
             }}>
            <Typography
              variant="h4"
              fontWeight="500"
              sx={{ mb: 2 }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              {description}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1 }}>
                • 2 Guests
              </Typography>

              <Typography sx={{ mb: 1 }}>
                • King Size Bed
              </Typography>

              <Typography>
                • Free Wi-Fi
              </Typography>
            </Box>

            <Typography
              variant="h4"
              color="primary"
              fontWeight="bold"
            >
              ${price} / night
            </Typography>
          </CardContent>

          {/* BUTTONS */}
          <CardActions
             sx={{
                 px: 4,
                 pb: 4,
                 pt: 0,
                 display: "flex",
                 gap: 2,
                    }}
            >
            <Button
              variant="contained"
              onClick={() => setOpenBooking(true)}
              sx={{
                backgroundColor: "#232c39",
                px: 5,
                py: 1.5,
                borderRadius: 0,
                textTransform: "none",
                fontSize: "1rem",

                "&:hover": {
                  backgroundColor: "#1b222d",
                },
              }}
            >
              Book Now
            </Button>

            <Button
              variant="outlined"
              component={Link}
              to={`/rooms/${title.toLowerCase().replace(/\s+/g, "-")}`}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 0,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              View Details
            </Button>
          </CardActions>
        </Box>
      </Card>

      {/* BOOKING MODAL */}
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
       <IconButton onClick={() => setOpenBooking(false)}>
           <CloseIcon />
              </IconButton>
      </Box>

        <DialogContent>
           <BookingForm roomTitle={title}
           roomId={roomId} />
              </DialogContent>
       </Dialog>
     </>
    );
}

export default RoomCard;