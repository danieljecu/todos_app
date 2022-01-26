import { NextFunction, Router, Response, Request } from "express";
import * as jwt from "jsonwebtoken";

// TODO replace with: const JWT_SECRET_KEY=process.env.jwt;
const JWT_SECRET_KEY = "secretkey23456";

function verifyToken(req: Request, res: Response, next: NextFunction) {
  //Get auth header value
  console.log("verifyToken1", req.headers.authorization);

  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== undefined) {
    console.log("verifyToken2", bearerHeader);
    const bearerToken = bearerHeader?.split(" ")[1];
    console.log("bearerToken", bearerToken);
    // req.token = bearerToken;
    //Verify token
    const decoded = jwt.verify(
      String(bearerToken),
      JWT_SECRET_KEY,
      (err: any, authData: any) => {
        if (err) {
          console.log("verifyToken4", err);
          res.status(403).json({ error: "Forbidden" });
        }
        console.log("verifyToken3 auD", authData);
        // req.user = decoded;
        res.setHeader("token", authData);

        next();
      }
    );
    res.json({ bearerToken: bearerToken, decoded });
  } else {
    //forbidden
    res.sendStatus(403);
  }
  next();
}

export { verifyToken, JWT_SECRET_KEY };
