import request from "supertest";

jest.mock("../utils/db_client", () => ({
  prisma: {
    $queryRaw: jest.fn(),
  },
  prismaAsAny: {},
}));

import app from "../app";
import { prisma } from "../utils/db_client";

const queryRaw = prisma.$queryRaw as unknown as jest.Mock;

describe("GET /health", () => {
  beforeEach(() => {
    queryRaw.mockReset();
  });

  it("returns 200 and a database check without auth when Postgres answers", async () => {
    queryRaw.mockResolvedValue([{ "?column?": 1 }]);

    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok", db: "up" });
    expect(queryRaw).toHaveBeenCalledTimes(1);
  });

  it("stays public when an Authorization header is present", async () => {
    queryRaw.mockResolvedValue([1]);

    const response = await request(app)
      .get("/health")
      .set("Authorization", "Bearer super-secret-token");

    expect(response.status).toBe(200);
    expect(response.body.db).toBe("up");
    expect(JSON.stringify(response.body)).not.toContain("super-secret-token");
  });

  it("returns 503 when the database check fails", async () => {
    queryRaw.mockRejectedValue(new Error("connection refused"));

    const response = await request(app).get("/health");

    expect(response.status).toBe(503);
    expect(response.body).toEqual({ status: "error", db: "down" });
    expect(JSON.stringify(response.body)).not.toContain("connection refused");
  });
});
