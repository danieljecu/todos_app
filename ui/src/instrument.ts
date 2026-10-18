import * as Sentry from "@sentry/react";

const dsn = process.env.REACT_APP_SENTRY_DSN?.trim();

/**
 * Browser Sentry. No-op when REACT_APP_SENTRY_DSN is missing so local
 * builds and tests boot without a DSN.
 */
export function initSentry(): void {
  if (!dsn) return;
  try {
    Sentry.init({
      dsn,
      environment: process.env.NODE_ENV,
      sendDefaultPii: false,
      tracesSampleRate: 0,
      beforeSend(event) {
        const headers = event.request?.headers;
        if (headers) {
          for (const key of Object.keys(headers)) {
            if (/authorization|cookie|token|password|secret/i.test(key)) {
              headers[key] = "[Redacted]";
            }
          }
        }
        return event;
      },
    });
  } catch {
    // Observability must not take down the UI.
  }
}

initSentry();
