import { getAllTasks, getTask, createTask,updateTask, deleteTask } from '../controllers/task';
import { Router } from 'express';

const TaskRouter = Router();
TaskRouter.route("/").get(getAllTasks);
TaskRouter.route("/:task_id").get(getTask);
TaskRouter.route("/").post(createTask)
TaskRouter.route("/:task_id").put(updateTask)
TaskRouter.route("/:task_id").delete(deleteTask)



export default TaskRouter;