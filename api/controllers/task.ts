import { equal } from "assert";
import { Request, Response } from "express";
import { prisma } from "./../utils/db_client";
import { TaskService } from "./../services/";
import logger from "../utils/logger";

async function getAllTasks(req: Request, res: Response) {
  const { tasklist } = req.query;

  try {
    const tasks = await TaskService.getTasksByTasklistId(tasklist as string);

    if (tasks && tasks.length > 0) {
      res.status(200).json(tasks);
    }
    if (tasks && tasks.length == 0) {
      res.status(204).json(tasks);
    }
  } catch (error) {
    res.status(404).json(error);
  }
}

async function getTask(req: Request, res: Response) {
  const { task_id } = req.params;
  logger.info("getTask", { task_id });

  try {
    const task = await TaskService.getTask(String(task_id));

    res.status(200).json(task);
  } catch (db_error) {
    res.status(404).json(db_error);
  }
}

async function createTask(req: Request, res: Response) {
  logger.info("createTask");
  const { title, description, due_date, task_list_id, task_status_id } =
    req.body;

  try {
    const task = await TaskService.createTask(
      title,
      description,
      due_date,
      task_list_id,
      task_status_id
    );

    res.status(201).json(task);
  } catch (db_error) {
    res.status(404).json(db_error);
  }
}

async function updateTask(req: Request, res: Response) {
  const { task_id } = req.params;
  const { title, description, due_date, task_list_id, task_status_id } =
    req.body;

  try {
    logger.info("updateTask", { task_id });
    const task = await TaskService.updateTaskById(
      String(task_id),
      title,
      description,
      due_date,
      task_list_id,
      task_status_id
    );

    res.status(204).json(task);
  } catch (db_error) {
    res.status(404).json({ error: "task not found", db_error });
  }
}

async function deleteTask(req: Request, res: Response) {
  const { task_id } = req.params;

  try {
    const task = await TaskService.deleteTaskById(String(task_id));

    logger.info("deleteTask", { task_id });
    res.sendStatus(204);
  } catch (db_error) {
    res.status(404).json({ error: "task not found", db_error });
  }
}

export { getAllTasks, getTask, createTask, updateTask, deleteTask };
