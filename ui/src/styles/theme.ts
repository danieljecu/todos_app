import { PaletteColorOptions } from "@mui/material";
import { PaletteOptions } from "@mui/material/styles";
import { IPropsColor } from "interfaces";

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
};

const primary: PaletteColorOptions = {
  main: colors.ocean,
  contrastText: colors.greyCool,
};

const secondary: PaletteColorOptions = {
  main: colors.tangerine,
  contrastText: colors.greyCharcoal,
};

const warning: PaletteColorOptions = {
  main: colors.tangerineLight,
  contrastText: colors.greyCloudy,
};

const success: PaletteColorOptions = {
  main: colors.grassGreen,
  contrastText: colors.greyCharcoal,
};

const info: PaletteColorOptions = {
  main: colors.navy,
  contrastText: colors.greyCool,
};
// const text: Partial<TypeText> = {
//   primary: colors.greyCool,
//   secondary: colors.greyCharcoal,
// };

const palette: PaletteOptions = {
  primary,
  secondary,
  warning,
  success,
  info,
  // text,
};

const Theme = { colors, palette };

export default Theme;
