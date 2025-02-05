import { createTheme } from "@mui/material/styles";

export const dashboardTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          fontWeight: 600,
          borderRadius: 8.5,
          textTransform: "none",
          "&.MuiButton-contained": {
            backgroundColor: "#009be5",
            "&:hover": {
              backgroundColor: "#006db3",
            },
          },
          "&.MuiButton-outlined": {
            color: "#fff",
            borderColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "1.7rem",
        },
      },
    },
  },
  palette: {
    primary: {
      light: "rgb(167, 73, 85)",
      main: "#960013",
      dark: "rgb(72, 0, 10)",
    },
    secondary: {
      light: "#FFD78E",
      main: "#FFA500",
      dark: "#CC8400",
    },
    error: {
      light: "#FF9999",
      main: "#FF3B3B",
      dark: "#B00020",
    },
    warning: {
      light: "#FFF4B2",
      main: "#FFC107",
      dark: "#C79100",
    },
    info: {
      light: "#AEE4FF",
      main: "#2196F3",
      dark: "#1769AA",
    },
    success: {
      light: "#A6E7A6",
      main: "#4CAF50",
      dark: "#2E7D32",
    },
  },
  typography: {
    h1: {
      fontSize: "2.6rem",
      fontWeight: 600,
      color: "#fff",
      letterSpacing: "0.5px",
      textTransform: "capitalize",
    },
    h2: {
      fontSize: "1.6rem",
      fontWeight: 600,
      color: "#fff",
      letterSpacing: "0.5px",
      textTransform: "capitalize",
    },
  },
});
