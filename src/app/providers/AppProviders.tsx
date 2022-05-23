import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppProvidersProps } from "./AppProviders.types";
import { StoreContext, store } from "./RootStoreProvider";
import theme from "app/styles/theme";

export const AppProviders = ({ children }: AppProvidersProps) => (
  <Router>
    <StoreContext.Provider value={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StoreContext.Provider>
  </Router>
);
