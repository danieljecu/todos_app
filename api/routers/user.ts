import { getAllUsers, getUser, createUser,updateUser, deleteUser } from '../controllers/user';
import { NextFunction, Router , Response, Request} from 'express';
import { check, param, body,validationResult } from 'express-validator';
import generalValidate from './generalValidate';


const userRouter = Router();
userRouter.route("/").get(getAllUsers);
userRouter.get("/:user_id", param('user_id').isNumeric().withMessage("user_id must be numeric"), getUser);

userRouter.post("/", [
    check('email').isEmail(),
    check("username")
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("username must be entered"),
    check("password")
      .isLength({ min: 3 })
      .withMessage("password must be at least 3 characters long")
      .trim(),
  ],
  generalValidate,
    createUser);


userRouter.put("/:user_id",
[   
    param('user_id').isNumeric().withMessage("user_id must be numeric"),
    body('username', "username doesn't exists").isLength({ min: 3 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'password must be at least 3 characters long').isLength({ min: 3 })   ],
    generalValidate, updateUser);

userRouter.delete("/:user_id", 
    [ param('user_id').isNumeric().withMessage("user_id must be numeric")],
    generalValidate, deleteUser);


export default userRouter;