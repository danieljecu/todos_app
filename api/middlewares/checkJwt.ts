import { NextFunction, Router, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import { UserService } from "./../services";

// TODO replace with: const JWT_SECRET_KEY=process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = "secretkey23456";
const REFRESH_TOKEN_SECRET = "secretkey23456";
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
