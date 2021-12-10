import { Request, Response } from 'express';

async function getAllTasklists(req: Request, res: Response) {
  console.log("getAllTasklists")
    res.sendStatus(200);
}

async function getTasklist( req: Request, res: Response){
  const { tasklist_id } = req.params;
  console.log("getTasklist")

  res.sendStatus(204);
}

async function createTasklist(req: Request, res: Response) {
  console.log("createTasklist")
  res.sendStatus(204);
}

async function updateTasklist(req: Request, res: Response) {
  const { tasklist_id } = req.params;
  console.log("updateTasklist")
  res.sendStatus(204);
}

async function deleteTasklist(req: Request, res: Response) {
  const { tasklist_id } = req.params;

  console.log("deleteTasklist")
  res.sendStatus(204);
}





export { getAllTasklists, getTasklist, createTasklist, updateTasklist, deleteTasklist};
