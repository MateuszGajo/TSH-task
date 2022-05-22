import { createTheme } from "@mui/material/styles";
import "./theme";

const THEME = createTheme({
  typography: {
    allVariants: {
      fontFamily: `'Nunito', "Helvetica", "Arial", sans-serif`,
      color: "#1A1B1D",
    },
  },
  palette: {
    primary: {
      main: "#4460F7",
      dark: "#2140E8",
    },
    secondary: {
      main: "#F0F1F5",
    },
  },
  myColor: {
    orange: {
      main: "#F9A52B",
    },
    black: {
      main: "#1A1B1D",
    },
    grey: {
      main: "#B9BDCF",
      dark: "#9194A5",
      light: "#E0E2EA",
    },
  },
});

export default THEME;
