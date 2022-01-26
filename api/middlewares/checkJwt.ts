import { NextFunction, Router, Response, Request } from "express";
import * as jwt from "jsonwebtoken";

// TODO replace with: const JWT_SECRET_KEY=process.env.jwt;
const JWT_SECRET_KEY = "secretkey23456";
const expiresIn = "24h";

function verifyToken(req: Request, res: Response, next: NextFunction) {
  //Get auth header value
  console.log("verifyToken1", req.headers.authorization);

  const token = req.headers.authorization?.split(" ")[1];
  console.log("verifyToken2", token);
  let jwtPayload;
  //Verify token
  try {
    jwtPayload = <any>jwt.verify(String(token), JWT_SECRET_KEY);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { id, email } = jwtPayload;
  const newToken = jwt.sign({ id, email }, JWT_SECRET_KEY, {
    expiresIn,
  });

  res.setHeader("token", newToken);

  // const decoded = jwt.verify(
  //   String(token),
  //   JWT_SECRET_KEY,
  //   (err: any, authData: any) => {
  //     if (err) {
  //       console.log("verifyToken4", err);
  //       res.status(403).json({ error: "Forbidden" });
  //     }
  //     console.log("verifyToken3 auD", authData);
  //     // req.user = decoded;

  //     res.setHeader("token", JSON.stringify(authData));

  //     next();
  // }
  // );

  //else {
  //   //forbidden
  //   res.sendStatus(403);
  // }
  next();
}

export { verifyToken, JWT_SECRET_KEY, expiresIn };
