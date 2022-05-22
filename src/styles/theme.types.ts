import { Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    myColor: {
      orange: {
        main: string;
      };
      black: {
        main: string;
      };
      grey?: {
        main?: string;
        light?: string;
        dark?: string;
      };
    };
  }

  interface ThemeOptions {
    myColor: {
      orange?: {
        main?: string;
      };
      black?: {
        main?: string;
      };
      grey?: {
        main?: string;
        light?: string;
        dark?: string;
      };
    };
  }
}
