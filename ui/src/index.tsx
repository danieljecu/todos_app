import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import { AppProvider } from "providers/app-provider";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root was not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
