import { createUser, login } from "../controllers/user";
import { NextFunction, Router, Response, Request } from "express";
import { check, param, body, validationResult } from "express-validator";
import generalValidate from "./generalValidate";

const AuthRouter = Router();
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
