import { Request, Response } from "express";
import { prisma } from "../utils/db_client";
import logger from "../utils/logger";

/**
 * Unauthenticated liveness + database probe.
 * 200 when Postgres answers; 503 when it does not (Render health checks).
 */
async function getHealth(_req: Request, res: Response) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok", db: "up" });
  } catch (error) {
    logger.error("health check database probe failed", error);
    res.status(503).json({ status: "error", db: "down" });
  }
}

export { getHealth };
