import { createUser, login, refreshToken } from "../controllers/auth";
import { NextFunction, Router, Response, Request } from "express";
import { check, param, body, validationResult } from "express-validator";
import generalValidate from "./generalValidate";
import { verifyToken } from "../middlewares/checkJwt";

const AuthRouter = Router();

AuthRouter.post(
  "/refresh",
  [
    check("email").isEmail(),
    check("password")
      .isLength({ min: 3 })
      .withMessage("password must be at least 3 characters long")
      .trim(),
  ],
  verifyToken,
  generalValidate,
  refreshToken
);

AuthRouter.post(
  "/register",
  [
    check("email").isEmail(),
    check("password")
      .isLength({ min: 3 })
      .withMessage("password must be at least 3 characters long")
      .trim(),
  ],
  generalValidate,
  createUser
);

AuthRouter.post(
  "/login",
  [
    check("email").isEmail(),
    check("password")
      .isLength({ min: 3 })
      .withMessage("password must be at least 3 characters long")
      .trim(),
  ],
  generalValidate,
  login
);

export default AuthRouter;
