import { equal } from "assert";
import { query, Request, Response } from "express";
import prisma from "./db_service";

async function getAllTasks(req: Request, res: Response) {
  const { tasklist } = req.query;
  const tasks = await prisma.tasks.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      due_date: true,
      created_at: true,
      comments: true,
      task_list_id: true,
      task_status_id: true,
    },
    where: {
      task_list_id: tasklist ? { equals: Number(tasklist) } : null,
    },
  });

  if (tasks?.length > 0) {
    res.status(200).json(tasks);
  } else {
    console.log("getAllTasks", tasks);
    res.sendStatus(404);
  }
}

async function getTask(req: Request, res: Response) {
  const { task_id } = req.params;
  console.log("getTask");

  try {
    const task = await prisma.tasks.findUnique({
      where: {
        id: parseInt(task_id),
      },
      select: {
        id: true,
        title: true,
        description: true,
        due_date: true,
        created_at: true,
        task_list_id: true,
        task_status_id: true,
      },
    });

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
    const task = await prisma.tasks.create({
      data: {
        title: title,
        description: description,
        due_date: due_date,
        created_at: new Date(),
        task_list_id: task_list_id,
        task_status_id: task_status_id,
      },
    });

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
    const task = await prisma.tasks.update({
      where: {
        id: parseInt(task_id),
      },
      data: {
        title: title,
        description: description,
        due_date: due_date,
        task_list_id: task_list_id,
        task_status_id: task_status_id,
      },
    });
    res.status(204).json(task);
  } catch (db_error) {
    res.status(404).json({ error: "task not found", db_error });
  }
}

async function deleteTask(req: Request, res: Response) {
  const { task_id } = req.params;

  try {
    const task = await prisma.tasks.delete({
      where: {
        id: parseInt(task_id),
      },
    });

    console.log("deleteTask");
    res.sendStatus(204);
  } catch (db_error) {
    res.status(404).json({ error: "task not found", db_error });
  }
}

export { getAllTasks, getTask, createTask, updateTask, deleteTask };
