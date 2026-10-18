import { PassThrough } from "stream";
import pino from "pino";
import { loggerOptions } from "../utils/logger";
import {
  requestPath,
  serializeRequest,
  serializeResponse,
} from "../middlewares/httpLogger";

function capture(log: (logger: pino.Logger) => void): string {
  const stream = new PassThrough();
  const chunks: Buffer[] = [];
  stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
  const logger = pino(loggerOptions, stream);
  log(logger);
  return Buffer.concat(chunks).toString("utf8");
}

describe("structured logger", () => {
  it("redacts passwords, tokens and authorization headers", () => {
    const line = capture((logger) => {
      logger.info(
        {
          password: "hunter2",
          token: "raw-token",
          accessToken: "access-token",
          refreshToken: "refresh-token",
          authorization: "Bearer header-token",
          headers: { authorization: "Bearer nested", cookie: "session=1" },
          ok: true,
        },
        "login"
      );
    });

    expect(line).not.toContain("hunter2");
    expect(line).not.toContain("raw-token");
    expect(line).not.toContain("access-token");
    expect(line).not.toContain("refresh-token");
    expect(line).not.toContain("header-token");
    expect(line).not.toContain("Bearer nested");
    expect(line).not.toContain("session=1");
    expect(line).toContain("[Redacted]");
    expect(line).toContain('"ok":true');
  });

  it("strips postgres URLs from error messages", () => {
    const line = capture((logger) => {
      const error = new Error(
        "Can't reach postgresql://user:secret-pass@localhost:5432/todo"
      );
      logger.error({ err: error }, "db");
    });

    expect(line).not.toContain("secret-pass");
    expect(line).not.toContain("postgresql://");
    expect(line).toContain("[Redacted]");
  });
});

describe("request log serializer", () => {
  it("keeps id, method and path and drops the query string and headers", () => {
    const serialized = serializeRequest({
      id: "req-1",
      method: "GET",
      url: "/task?token=super-secret",
    });

    expect(serialized).toEqual({
      id: "req-1",
      method: "GET",
      path: "/task",
    });
    expect(JSON.stringify(serialized)).not.toContain("super-secret");
    expect(requestPath("/health?accessToken=abc")).toBe("/health");
  });

  it("records status without response headers", () => {
    expect(serializeResponse({ statusCode: 204 })).toEqual({ status: 204 });
  });
});
