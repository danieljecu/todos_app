import { TypeText } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    success?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    info?: PaletteColorOptions;
    error?: PaletteColorOptions;
    text?: Partial<TypeText>;
  }
}

declare module '@mui/material/styles/createMuiTheme' {
  interface DeprecatedThemeOptions {
    themeName?: string;
    palette?: PaletteOptions;
  }
}
