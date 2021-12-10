import { getAllUsers, getUser, createUser,updateUser, deleteUser } from '../controllers/user';
import { Router } from 'express';

const userRouter = Router();
userRouter.route("/").get(getAllUsers);
userRouter.route("/:user_id").get(getUser);

userRouter.route("/").post(createUser)
userRouter.route("/:user_id").put(updateUser)
userRouter.route("/:user_id").delete(deleteUser)



export default userRouter;