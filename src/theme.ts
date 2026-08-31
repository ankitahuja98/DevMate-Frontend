import { createTheme } from "@mui/material/styles";

// Central MUI theme — re-skins every MUI component (TextField, Button,
// Dialog, IconButton, Chip, ...) with the app's violet brand instead of
// MUI's stock blue, without touching each usage site individually.
const theme = createTheme({
  palette: {
    primary: {
      main: "#6d3df5",
      light: "#8b5cf6",
      dark: "#4c1fd1",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8b5cf6",
      light: "#a78bfa",
      dark: "#6d28d9",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444",
    },
    success: {
      main: "#159a63",
    },
    background: {
      default: "#f7f8fc",
      paper: "#ffffff",
    },
    text: {
      primary: "#17213d",
      secondary: "#6b7691",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily:
      '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        containedPrimary: {
          backgroundColor: "#6d3df5",
          boxShadow: "0 8px 20px rgba(109, 61, 245, 0.25)",
          "&:hover": {
            backgroundColor: "#5b2fe0",
            boxShadow: "0 10px 24px rgba(109, 61, 245, 0.32)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
