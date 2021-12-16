import { getAllTasks, getTask, createTask,updateTask, deleteTask } from '../controllers/task';
import { Router } from 'express';
import generalValidate from './generalValidate';
import {check, param, body, query } from 'express-validator';

const TaskRouter = Router();
TaskRouter.get("/", generalValidate, getAllTasks);
TaskRouter.get("/:task_id",
param("task_id").isInt().withMessage("task_id must be an integer")
,generalValidate,getTask);

TaskRouter.post("/",
check("title").isString().withMessage("title must be a string"),
body("description").isString().withMessage("description must be a string"),
generalValidate,createTask);

TaskRouter.put("/:task_id",
check("task_id").isInt().withMessage("task_id must be an integer"),
check("title").isString().withMessage("title must be a string"),
body("description").isString().withMessage("description must be a string")
,generalValidate,updateTask)

TaskRouter.delete("/:task_id",
param("task_id").isInt().withMessage("task_id must be an integer")
, generalValidate,deleteTask)


export default TaskRouter;