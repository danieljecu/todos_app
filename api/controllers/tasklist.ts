import { Request, Response } from "express";
import { prisma } from "./../utils/db_client";
import { TasklistService } from "./../services";
import logger from "../utils/logger";

async function getAllTasklists(req: Request, res: Response) {
  const { project_id } = req.params;
  logger.info("getAllTasklists", { project_id });
  const tasklists = await TasklistService.getTasklistsByProjectId(
    Number(project_id)
  );
  logger.info("getAllTasklists result", { count: tasklists?.length ?? 0 });

  if (tasklists?.length > 0) {
    res.status(200).json(tasklists);
  } else {
    res.sendStatus(404);
  }
}

async function getTasklist(req: Request, res: Response) {
  const { project_id, tasklist_id } = req.params;
  logger.info("getTasklist", { project_id, tasklist_id });

  //TODO why is not working
  try {
    const tasklist = await TasklistService.getTasklistById(Number(tasklist_id));

    res.status(200).json(tasklist);
  } catch (db_error) {
    res.status(404).json({ error: "test get tasklist error", db_error });
  }
}

async function createTasklist(req: Request, res: Response) {
  // const { project_id } = req.params;
  const { project_id, name } = req.body;

  logger.info("createTasklist", { project_id, name });

  try {
    const tasklist = await TasklistService.createTasklist(project_id, name);

    res.status(201).json(tasklist);
  } catch (db_error) {
    res.status(404).json(db_error);
  }
}

async function updateTasklist(req: Request, res: Response) {
  const { project_id, tasklist_id } = req.params;
  const { name } = req.body;

  logger.info("updateTasklist", { project_id, tasklist_id });

  try {
    const tasklist = TasklistService.updateTasklist(
      Number(tasklist_id),
      name,
      Number(project_id)
    );
    res.status(204).json(tasklist);
  } catch (db_error) {
    res.status(400).json({ error: "project not found", db_error });
  }
}

async function deleteTasklist(req: Request, res: Response) {
  const { project_id, tasklist_id } = req.params;

  try {
    const tasklist = await TasklistService.deleteTasklist(Number(tasklist_id));

    logger.info("deleteTasklist", { project_id, tasklist_id });
    res.sendStatus(200).json(tasklist);
  } catch (db_error) {
    res.status(404).json({ error: "tasklist not found", db_error });
  }
}

export {
  getAllTasklists,
  getTasklist,
  createTasklist,
  updateTasklist,
  deleteTasklist,
};
