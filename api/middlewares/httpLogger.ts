import { randomUUID } from "crypto";
import { IncomingMessage, ServerResponse } from "http";
import pinoHttp, { Options } from "pino-http";
import Logger from "../utils/logger";

/** Path only — query strings can carry tokens. */
export function requestPath(url?: string): string {
  if (!url) return "";
  const query = url.indexOf("?");
  return query === -1 ? url : url.slice(0, query);
}

/**
 * Request log shape: id, method, path.
 * Headers (including Authorization) are intentionally omitted.
 */
export function serializeRequest(req: {
  id?: unknown;
  method?: string;
  url?: string;
}) {
  return {
    id: req.id,
    method: req.method,
    path: requestPath(req.url),
  };
}

export function serializeResponse(res: { statusCode?: number }) {
  return { status: res.statusCode };
}

function requestId(req: IncomingMessage, res: ServerResponse): string {
  const header = req.headers["x-request-id"];
  const raw = Array.isArray(header) ? header[0] : header;
  const id = raw && /^[\w\-.]{1,128}$/.test(raw) ? raw : randomUUID();
  res.setHeader("X-Request-Id", id);
  return id;
}

const httpLoggerOptions: Options = {
  // pino-http's types target an older Logger generic than pino 9.
  logger: Logger.raw as unknown as Options["logger"],
  genReqId: requestId,
  wrapSerializers: false,
  customAttributeKeys: {
    responseTime: "duration",
  },
  customLogLevel(_req, res, err) {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
  customSuccessMessage(req, res, responseTime) {
    return `${req.method} ${requestPath(req.url)} ${res.statusCode} ${responseTime}ms`;
  },
  customErrorMessage(req, res) {
    return `${req.method} ${requestPath(req.url)} ${res.statusCode}`;
  },
  serializers: {
    req: serializeRequest,
    res: serializeResponse,
  },
};

const httpLogger = pinoHttp(httpLoggerOptions);

export default httpLogger;
