import React, { Suspense } from "react";

import { AuthProvider } from "../contexts/auth";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Theme from "styles/theme";
const theme = createTheme(Theme);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.StrictMode>
      <Suspense fallback={<div>Loading... </div>}>
        <ThemeProvider theme={theme}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <ToastContainer />
      </Suspense>
    </React.StrictMode>
  );
};
