// see https://testing-library.com/docs/react-testing-library/setup#custom-render
import React, { ReactNode } from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { Queries } from "@testing-library/dom";
import CssBaseline from "@mui/material/CssBaseline";
import THEME from "styles/theme";
import { ThemeProvider } from "@mui/material/styles";

const Wrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={THEME}>{children}</ThemeProvider>
    </Router>
  );
};

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult;
function customRender<Q extends Queries>(
  ui: React.ReactElement,
  options: RenderOptions<Q>
): RenderResult<Q>;
function customRender<Q extends Queries>(
  ui: React.ReactElement,
  options?: RenderOptions<Q> | Omit<RenderOptions, "queries">
): RenderResult<Q> | RenderResult {
  return render<Q>(ui, { wrapper: options?.wrapper ?? Wrapper, ...options });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
