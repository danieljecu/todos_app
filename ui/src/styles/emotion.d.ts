import "@emotion/react";
import { Theme as MuiTheme } from "@mui/material/styles";

// MUI's ThemeProvider injects its theme into emotion's context, so emotion
// styled components receive the full MUI theme (including `colors`).
declare module "@emotion/react" {
  export interface Theme extends MuiTheme {}
}
