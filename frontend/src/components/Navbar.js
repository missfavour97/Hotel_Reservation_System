import React from "react";
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
          <Button color="inherit">Home</Button>
          <Button color="inherit">Rooms</Button>
          <Button color="inherit">Membership</Button>
          <Button color="inherit">Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;