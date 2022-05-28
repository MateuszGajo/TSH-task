import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppProvidersProps } from "./AppProviders.types";
import { StoreContext, store, useModalStore } from "./RootStoreProvider";
import theme from "app/styles/theme";
import { observer } from "mobx-react-lite";
import ModalContainer from "app/components/modal/ModalContainer";
import { GlobalStyles } from "@mui/material";

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <Router>
      <StoreContext.Provider value={store}>
        <CssBaseline />
        <GlobalStyles styles={{ body: { overflow: "overlay" } }} />
        <ThemeProvider theme={theme}>
          <ModalContainer />
          {children}
        </ThemeProvider>
      </StoreContext.Provider>
    </Router>
  );
};

export default observer(AppProviders);
