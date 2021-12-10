import { Request, Response } from 'express';

async function getAllProjects(req: Request, res: Response) {
  console.log("getAllProjects")
    res.sendStatus(200);
}

async function getProject( req: Request, res: Response){
  const { project_id } = req.params;
  console.log("getProject")

  res.sendStatus(204);
}

async function createProject(req: Request, res: Response) {

  console.log("createProject")
  res.sendStatus(204);
}

async function updateProject(req: Request, res: Response) {
  const { project_id } = req.params;
  console.log("updateProject")
  res.sendStatus(204);
}

async function deleteProject(req: Request, res: Response) {
  const { project_id } = req.params;

  console.log("deleteProject")
  res.sendStatus(204);
}





export { getAllProjects, getProject, createProject, updateProject, deleteProject};
