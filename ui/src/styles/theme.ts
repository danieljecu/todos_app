import { PaletteColorOptions, PaletteMode } from "@mui/material";
import {
  createTheme,
  PaletteOptions,
  Theme as MuiTheme,
} from "@mui/material/styles";
import { IPropsColor } from "interfaces";
import { TypeText, TypeBackground } from "@mui/material/styles/createPalette";

// Expose the semantic color tokens on the MUI theme so emotion styled
// components can read them from context and react to mode changes.
declare module "@mui/material/styles" {
  interface Theme {
    colors: IPropsColor;
  }
  interface ThemeOptions {
    colors?: IPropsColor;
  }
}

// Brand colors — identical in both modes
const brand = {
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
};

// Semantic tokens for surfaces/text, per mode
const lightColors: IPropsColor = {
  ...brand,
  pageBg: "#f4f6f8",
  surface: "#ffffff",
  border: "#d5d8dc",
  textPrimary: "#20262b",
  textSecondary: "#5f6360",
  cardHeader: "#e3f1fb",
};

const darkColors: IPropsColor = {
  ...brand,
  pageBg: "#10161a",
  surface: "#1c242b",
  border: "#3b464f",
  textPrimary: "#e6e9eb",
  textSecondary: "#9fa8ae",
  cardHeader: "#16324a",
};

export const getColors = (mode: PaletteMode): IPropsColor =>
  mode === "dark" ? darkColors : lightColors;

const getPalette = (mode: PaletteMode): PaletteOptions => {
  const colors = getColors(mode);

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
    main: mode === "dark" ? colors.navyLight : colors.navy,
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

  return {
    mode,
    primary,
    secondary,
    warning,
    success,
    info,
    text,
    background,
    divider: colors.border,
  };
};

export const getTheme = (mode: PaletteMode): MuiTheme =>
  createTheme({ palette: getPalette(mode), colors: getColors(mode) });

// Back-compat default export: light-mode tokens/palette
const Theme = { colors: lightColors, palette: getPalette("light") };

export default Theme;
