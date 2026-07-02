import { PaletteColorOptions } from "@mui/material";
import { PaletteOptions } from "@mui/material/styles";
import { IPropsColor } from "interfaces";
import { TypeText, TypeBackground } from "@mui/material/styles/createPalette";

const colors: IPropsColor = {
  navy: "#013d54",
  navyLight: "#3a6781",
  navyDark: "#00172b",
  ocean: "#3c8fc5",
  oceanLight: "#75bff8",
  oceanDark: "#006294",
  grassGreen: "#81AF41",
  grassGreenLight: "#b3e170",
  grassGreenDark: "#517f0c",
  tangerine: "#f57e20",
  tangerineLight: "#ffaf52",
  tangerineDark: "#bc4f00",
  greyCool: "#E5E6E5",
  greyCloudy: "#c9c9c8",
  greyCharcoal: "#363936",
  // Semantic tokens for surfaces/text (light theme)
  pageBg: "#f4f6f8",
  surface: "#ffffff",
  border: "#d5d8dc",
  textPrimary: "#20262b",
  textSecondary: "#5f6360",
  cardHeader: "#e3f1fb",
};

const primary: PaletteColorOptions = {
  main: colors.ocean,
  contrastText: "#ffffff",
};

const secondary: PaletteColorOptions = {
  main: colors.tangerine,
  contrastText: "#ffffff",
};

const warning: PaletteColorOptions = {
  main: colors.tangerineLight,
  contrastText: colors.greyCharcoal,
};

const success: PaletteColorOptions = {
  main: colors.grassGreen,
  contrastText: colors.greyCharcoal,
};

const info: PaletteColorOptions = {
  main: colors.navy,
  contrastText: "#ffffff",
};
const text: Partial<TypeText> = {
  primary: colors.textPrimary,
  secondary: colors.textSecondary,
};

const background: Partial<TypeBackground> = {
  default: colors.pageBg,
  paper: colors.surface,
};

const palette: PaletteOptions = {
  mode: "light",
  primary,
  secondary,
  warning,
  success,
  info,
  text,
  background,
  divider: colors.border,
};

const Theme = { colors, palette };

export default Theme;
