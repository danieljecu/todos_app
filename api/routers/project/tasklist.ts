import { getAllTasklists, getTasklist, createTasklist,updateTasklist, deleteTasklist } from '../../controllers/tasklist';
import { Router } from 'express';

const TasklistRouter = Router();
TasklistRouter.route("/").get(getAllTasklists);
TasklistRouter.route("/:tasklist_id").get(getTasklist);

TasklistRouter.route("/").post(createTasklist)
TasklistRouter.route("/:tasklist_id").put(updateTasklist)
TasklistRouter.route("/:tasklist_id").delete(deleteTasklist)



export default TasklistRouter;