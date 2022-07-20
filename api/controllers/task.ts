import { equal } from "assert";
import { query, Request, Response } from "express";
import { prisma } from "./../utils/db_client";
import { TaskService } from "./../services/";

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
  console.log("getTask");

  try {
    const task = await TaskService.getTask(task_id);

    res.status(200).json(task);
  } catch (db_error) {
    res.status(404).json(db_error);
  }
}

async function createTask(req: Request, res: Response) {
  console.log("createTask");
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
    console.log("updateTask");
    const task = await TaskService.updateTaskById(
      task_id,
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
    const task = await TaskService.deleteTaskById(task_id);

    console.log("deleteTask");
    res.sendStatus(204);
  } catch (db_error) {
    res.status(404).json({ error: "task not found", db_error });
  }
}

export { getAllTasks, getTask, createTask, updateTask, deleteTask };
