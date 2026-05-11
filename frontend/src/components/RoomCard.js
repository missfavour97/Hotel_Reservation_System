import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";

function RoomCard({ image, title, price, description }) {
  return (
    <Card
      sx={{
        display: "flex",
        mb: 4,
        borderRadius: 3,
        boxShadow: 4,
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          width: 420,
          height: 280,
          objectFit: "cover",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold">
            {title}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ my: 2 }}
          >
            {description}
          </Typography>

          <Typography variant="h5" color="primary">
            ${price} / night
          </Typography>
        </CardContent>

        <CardActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            component={Link}
            to={`/rooms/${title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            View Details
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default RoomCard;