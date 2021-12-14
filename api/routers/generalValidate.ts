import { NextFunction,Response, Request} from 'express';
import {validationResult } from 'express-validator/check';

const generalValidate = (req: Request, res: Response, next: NextFunction ) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const hasError = !error.isEmpty();
    
    if (hasError) {
    res.status(400).json({ error: error.array() });
    }

    next();
};

export default generalValidate;