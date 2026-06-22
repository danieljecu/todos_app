import { NextFunction, Router, Response, Request } from "express";
import * as jwt from "jsonwebtoken";

// TODO: move this to constants
const isProd = process.env.NODE_ENV === "production";

function requireSecret(name: string): string {
  const value = process.env[name];
  if (!value) {
    if (isProd) {
      throw new Error(`Missing required environment variable: ${name}`);
    }
    return "not-a-secret"; // dev/test only fallback
  }
  return value;
}

const ACCESS_TOKEN_SECRET = requireSecret("ACCESS_TOKEN_SECRET");
const REFRESH_TOKEN_SECRET = requireSecret("REFRESH_TOKEN_SECRET");

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  //Get auth header value
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ err: "token not found" });
    return;
  }

  try {
    const tokenVerified =
      req.path === "/refresh"
        ? <any>jwt.verify(token, REFRESH_TOKEN_SECRET)
        : <any>jwt.verify(token, ACCESS_TOKEN_SECRET);

    if (tokenVerified) {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: "Access not Permitted!",
      errorMessage: error,
    });
  }
}

export { verifyToken, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET };
