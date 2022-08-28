import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/auth";
// import "react-toastify/dist/ReactToastify.css";
// minified version is also included
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Theme from "styles/theme";
const theme = createTheme(Theme);

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading... </div>}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
        <ToastContainer />
      </AuthProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
