import type { Express } from "express";
import logger from "./utils/logger";

const dsn = process.env.SENTRY_DSN?.trim();

function scrubHeaders(headers: Record<string, unknown> | undefined) {
  if (!headers) return;
  for (const key of Object.keys(headers)) {
    if (/authorization|cookie|token|password|secret/i.test(key)) {
      headers[key] = "[Redacted]";
    }
  }
}

/**
 * Initialize Sentry only when SENTRY_DSN is set.
 * A missing DSN is a no-op and must never crash the process.
 * Loaded before Express (see index.ts) so the Express integration can patch http.
 */
export function initSentry(): void {
  if (!dsn) return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Sentry = require("@sentry/node");
    const integrations =
      typeof Sentry.expressIntegration === "function"
        ? [Sentry.expressIntegration()]
        : [];
    Sentry.init({
      dsn,
      environment: process.env.NODE_ENV || "development",
      sendDefaultPii: false,
      // Errors only by default so the free Sentry quota is not spent on spans.
      tracesSampleRate: 0,
      integrations,
      beforeSend(event: { request?: { headers?: Record<string, unknown> } }) {
        scrubHeaders(event.request?.headers);
        return event;
      },
    });
  } catch (error) {
    logger.error("Sentry failed to initialize; continuing without it", error);
  }
}

/** Express error handler. No-op when Sentry is disabled. */
export function attachSentryErrorHandler(app: Express): void {
  if (!dsn) return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Sentry = require("@sentry/node");
    if (typeof Sentry.setupExpressErrorHandler === "function") {
      Sentry.setupExpressErrorHandler(app);
    }
  } catch (error) {
    logger.error("Sentry Express error handler was not attached", error);
  }
}

initSentry();
