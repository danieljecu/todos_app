import {
  getHealth,
  createUser,
  login,
  refreshToken,
  logout,
} from "../controllers/auth";
import { NextFunction, Router, Response, Request } from "express";
import { check, param, body, validationResult } from "express-validator";
import generalValidate from "./generalValidate";

const AuthRouter = Router();

AuthRouter.get("/health", generalValidate, getHealth);

AuthRouter.post("/refresh", generalValidate, refreshToken);

AuthRouter.post("/logout", generalValidate, logout);

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
