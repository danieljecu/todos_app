import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";

const generalValidate = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  next();
};

export default generalValidate;
