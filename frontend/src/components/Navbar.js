import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useThemeMode } from "../context/ThemeModeContext";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import BedIcon from "@mui/icons-material/Bed";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import BrandLogo from "./BrandLogo";


function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { mode, toggleMode } = useThemeMode();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

  const navItems = [
    { label: "Home", to: "/", icon: <HomeIcon /> },
    { label: "Rooms", to: "/rooms", icon: <BedIcon /> },
    { label: "Requests", to: "/requests", icon: <ContactSupportIcon /> },
  ];

  if (user) {
    navItems.push({
      label: "Reservations",
      to: "/my-reservations",
      icon: <AssignmentIcon />,
    });
  }

  if (isAdmin) {
    navItems.push({
      label: "Admin",
      to: "/admin",
      icon: <DashboardIcon />,
    });
  }

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const navButtons = (
    <>
      {navItems.map((item) => (
        <Button
          key={item.to}
          color={isActive(item.to) ? "secondary" : "inherit"}
          component={Link}
          to={item.to}
        >
          {item.label}
        </Button>
      ))}
    </>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ minHeight: 72, gap: 2 }}>
        <IconButton
          edge="start"
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
          aria-label="Open navigation"
        >
          <MenuIcon />
        </IconButton>

        <Box
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <BrandLogo />
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
          {navButtons}
        </Box>

        <Tooltip title={mode === "light" ? "Dark mode" : "Light mode"}>
          <IconButton onClick={toggleMode} color="inherit">
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
          {user ? (
            <>
              <Typography variant="body2" color="text.secondary">
                {user.fullName || user.email}
              </Typography>
              <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button variant="contained" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>

      <Drawer open={drawerOpen} onClose={closeDrawer}>
        <Box sx={{ width: 280, pt: 2 }} role="presentation">
          <Box sx={{ px: 2, pb: 1 }}>
            <BrandLogo showLocation />
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.to}
                component={Link}
                to={item.to}
                selected={isActive(item.to)}
                onClick={closeDrawer}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
          <Box sx={{ px: 2, py: 2, display: "grid", gap: 1 }}>
            {user ? (
              <Button
                variant="outlined"
                onClick={() => {
                  logout();
                  closeDrawer();
                }}
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/login"
                  onClick={closeDrawer}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to="/signup"
                  onClick={closeDrawer}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
