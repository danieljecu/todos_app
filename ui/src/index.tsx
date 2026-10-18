import "./instrument";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as Sentry from "@sentry/react";

import App from "./App";
import { AppProvider } from "providers/app-provider";

const app = (
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

ReactDOM.render(
  process.env.REACT_APP_SENTRY_DSN ? (
    <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}>
      {app}
    </Sentry.ErrorBoundary>
  ) : (
    app
  ),
  document.getElementById("root")
);
