import { NextFunction, Router, Response, Request } from "express";
import * as jwt from "jsonwebtoken";

// TODO: move this to constants
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "not-a-secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "not-a-secret";
const expiresIn = "1m";

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  //Get auth header value
  console.log("verifyToken1", req.headers.authorization);

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

export { verifyToken, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, expiresIn };
