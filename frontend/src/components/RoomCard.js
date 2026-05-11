import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

function RoomCard({ image, title, price, description }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
      <CardMedia
        component="img"
        height="220"
        image={image}
        alt={title}
      />

      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
          {description}
        </Typography>

        <Typography variant="h6" color="primary">
          ${price} / night
        </Typography>
      </CardContent>

      <CardActions>
        <Button 
        variant="contained"
          fullWidth
          component={Link}
          to="/room-details"
         >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default RoomCard;