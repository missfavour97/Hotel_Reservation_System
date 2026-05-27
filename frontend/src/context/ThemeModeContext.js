import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

const ThemeModeContext = createContext();

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("hotelThemeMode") || "light";
  });

  function toggleMode() {
    setMode((currentMode) => {
      const nextMode = currentMode === "light" ? "dark" : "light";
      localStorage.setItem("hotelThemeMode", nextMode);
      return nextMode;
    });
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#24536a" : "#7fb7c9",
          },
          secondary: {
            main: "#b4873c",
          },
          background: {
            default: mode === "light" ? "#f6f4ef" : "#111614",
            paper: mode === "light" ? "#ffffff" : "#1c211f",
          },
          text: {
            primary: mode === "light" ? "#202521" : "#f2f0e9",
            secondary: mode === "light" ? "#5f6762" : "#bec8c2",
          },
        },
        shape: {
          borderRadius: 8,
        },
        typography: {
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          h1: { fontWeight: 700, letterSpacing: 0 },
          h2: { fontWeight: 700, letterSpacing: 0 },
          h3: { fontWeight: 700, letterSpacing: 0 },
          h4: { fontWeight: 700, letterSpacing: 0 },
          h5: { fontWeight: 700, letterSpacing: 0 },
          h6: { fontWeight: 700, letterSpacing: 0 },
          button: {
            textTransform: "none",
            fontWeight: 700,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                minHeight: 42,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            'input[type="date"]': {
              colorScheme: mode,
            },
            'input[type="date"]::-webkit-calendar-picker-indicator': {
              cursor: "pointer",
              opacity: 1,
            },
          }}
        />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeModeContext);
}
