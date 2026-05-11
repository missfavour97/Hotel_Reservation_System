import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

function Navbar() {
  return (
    <AppBar position="absolute" sx={{ background: "transparent", boxShadow: "none" }}>
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          LuxeStay
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/">
           Home
          </Button>

          <Button color="inherit" component={Link} to="/rooms">
          Rooms
           </Button>
          <Button color="inherit" component={Link} to="/membership">
            Membership
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;