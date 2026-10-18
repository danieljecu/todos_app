import pino from "pino";
import pretty from "pino-pretty";

const isProd = process.env.NODE_ENV === "production";

/**
 * Colored console outside production (same idea as the old Winston logger).
 * Production stays JSON so Render log streams can be parsed in Loki.
 * LOG_FORMAT=pretty forces color; LOG_FORMAT=json forces JSON.
 */
export function usePrettyLogs(
  env: NodeJS.ProcessEnv = process.env
): boolean {
  if (env.LOG_FORMAT === "json") return false;
  if (env.LOG_FORMAT === "pretty") return true;
  return env.NODE_ENV !== "production";
}

/**
 * Structured logs. Redact secrets at the logger so a stray field never
 * reaches stdout, whether the line is colored or JSON.
 */
export const loggerOptions: pino.LoggerOptions = {
  level: process.env.LOG_LEVEL || (isProd ? "info" : "debug"),
  base: { service: "todos-api" },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "req.headers.Authorization",
      "req.headers.Cookie",
      "res.headers.set-cookie",
      "password",
      "*.password",
      "*.*.password",
      "*.*.*.password",
      "token",
      "*.token",
      "*.*.token",
      "*.*.*.token",
      "accessToken",
      "*.accessToken",
      "*.*.accessToken",
      "refreshToken",
      "*.refreshToken",
      "*.*.refreshToken",
      "authorization",
      "*.authorization",
      "*.*.authorization",
      "headers.authorization",
      "*.headers.authorization",
      "*.*.headers.authorization",
      "cookie",
      "*.cookie",
      "*.*.cookie",
      "headers.cookie",
      "*.headers.cookie",
      "*.*.headers.cookie",
      "data.password",
      "data.token",
      "data.accessToken",
      "data.refreshToken",
      "data.authorization",
      "err.config.headers.authorization",
      "err.config.headers.Authorization",
      "err.config.headers.cookie",
    ],
    censor: "[Redacted]",
  },
  serializers: {
    err(error) {
      const serialized = pino.stdSerializers.err(error);
      const redactUrl = (value: string) =>
        value.replace(/postgres(?:ql)?:\/\/\S+/gi, "[Redacted]");
      if (serialized.message) {
        serialized.message = redactUrl(serialized.message);
      }
      if (typeof serialized.stack === "string") {
        serialized.stack = redactUrl(serialized.stack);
      }
      return serialized;
    },
  },
};

const root = usePrettyLogs()
  ? pino(
      loggerOptions,
      pretty({
        colorize: true,
        translateTime: "yyyy-mm-dd HH:MM:ss.l",
        ignore: "pid,hostname",
        singleLine: true,
        // Match the previous Winston palette: info green, warn yellow, error red.
        customColors:
          "fatal:red,error:red,warn:yellow,info:green,debug:white,trace:white",
      })
    )
  : pino(loggerOptions);

function write(
  level: "fatal" | "error" | "warn" | "info" | "debug",
  message: unknown,
  meta?: unknown
) {
  const msg = typeof message === "string" ? message : "log";
  if (meta === undefined) {
    if (typeof message === "string") {
      root[level](message);
      return;
    }
    root[level]({ data: message });
    return;
  }
  if (meta instanceof Error) {
    root[level]({ err: meta }, msg);
    return;
  }
  root[level]({ data: meta }, msg);
}

const Logger = {
  fatal: (message: unknown, meta?: unknown) => write("fatal", message, meta),
  error: (message: unknown, meta?: unknown) => write("error", message, meta),
  warn: (message: unknown, meta?: unknown) => write("warn", message, meta),
  info: (message: unknown, meta?: unknown) => write("info", message, meta),
  debug: (message: unknown, meta?: unknown) => write("debug", message, meta),
  /** Kept so existing call sites that used Winston's http level still compile. */
  http: (message: unknown, meta?: unknown) => write("info", message, meta),
  raw: root,
};

export default Logger;
