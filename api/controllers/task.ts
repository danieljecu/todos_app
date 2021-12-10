import { Request, Response } from 'express';

async function getAllTasks(req: Request, res: Response) {
  console.log("getAllTasks")
    res.sendStatus(200);
}

async function getTask( req: Request, res: Response){
  const { task_id } = req.params;
  console.log("getTask")

  res.sendStatus(204);
}

async function createTask(req: Request, res: Response) {
  console.log("createTask")
  res.sendStatus(204);
}

async function updateTask(req: Request, res: Response) {
  const { task_id } = req.params;
  console.log("updateTask")
  res.sendStatus(204);
}

async function deleteTask(req: Request, res: Response) {
  const { task_id } = req.params;

  console.log("deleteTask")
  res.sendStatus(204);
}





export { getAllTasks, getTask, createTask, updateTask, deleteTask};
