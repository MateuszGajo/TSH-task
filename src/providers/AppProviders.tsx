import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppProvidersProps } from "./AppProviders.types";
import THEME from "styles/theme";

export const AppProviders = ({ children }: AppProvidersProps) => (
  <Router>
    <CssBaseline />
    <ThemeProvider theme={THEME}>{children}</ThemeProvider>
  </Router>
);
