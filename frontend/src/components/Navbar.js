import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";


function Navbar() {
  const { user, logout } = useAuth();

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

       <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
  {user ? (
    <>
      <Typography>
        {user.fullName || user.email}
      </Typography>

      <Button
        color="inherit"
        onClick={logout}
      >
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button
        color="inherit"
        component={Link}
        to="/login"
      >
        Login
      </Button>

      <Button
        variant="contained"
        component={Link}
        to="/signup"
      >
        Sign Up
      </Button>
    </>
  )}
     </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;