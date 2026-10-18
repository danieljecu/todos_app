import React, { Suspense } from "react";

import { AuthProvider } from "../contexts/auth";
// import "react-toastify/dist/ReactToastify.css";
// minified version is also included
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTheme } from "styles/theme";

const COLOR_MODE_STORAGE_KEY = "todos-color-mode";

export const ColorModeContext = React.createContext<{
  mode: PaletteMode;
  toggleColorMode: () => void;
}>({ mode: "light", toggleColorMode: () => {} });

export const useColorMode = () => React.useContext(ColorModeContext);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState<PaletteMode>(() => {
    const stored = localStorage.getItem(COLOR_MODE_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return prefersDark ? "dark" : "light";
  });

  const colorMode = React.useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === "light" ? "dark" : "light";
          localStorage.setItem(COLOR_MODE_STORAGE_KEY, next);
          return next;
        });
      },
    }),
    [mode]
  );

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <React.StrictMode>
      <Suspense fallback={<div>Loading... </div>}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
        <ToastContainer theme={mode} />
      </Suspense>
    </React.StrictMode>
  );
};
