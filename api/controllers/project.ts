import { Request, Response } from 'express';
import prisma from './db_service';


async function getAllProjects(req: Request, res: Response) {
  console.log("getAllProjects")
  const projects= await prisma.projects.findMany();
  if (projects?.length > 0) {
  res.status(200).json(projects);
  } else {
    res.sendStatus(404);
  }
}

async function getProject( req: Request, res: Response){
  const { project_id } = req.params;
  console.log("getProject")

  try
  {
  const project = await prisma.projects.findUnique({
    where: {
      id: parseInt(project_id),
    },
    select:{
      id: true,
      name: true
    }
  });
  res.status(200).json(project);
} catch (db_error) {
  res.status(404).json(db_error);
}
}

async function createProject(req: Request, res: Response) {
  console.log("createProject")
  const { name } = req.body;

  try{

  const project = await prisma.projects.create({
    data: {
      name: name,
      // TODO: maybe pass optionally user_id; but using project_users.create
    }
  });
  res.status(201).json(project);

}catch(db_error){
  res.status(404).json(db_error);
}

}
//204 status code is used for Update (put) or delete (delete) methods.
async function updateProject(req: Request, res: Response) {
  const { project_id } = req.params;
  const { name } = req.body;
  console.log("updateProject")
  
  try {
  const project = await prisma.projects.update(
    { where : {
        id: parseInt(project_id)
      },
      data:
      {
        name: name,
      }
    }
    );
  res.status(204).json(project);
} catch (db_error) {
  res.status(400).json({ error: "project not found", db_error });
}

}

async function deleteProject(req: Request, res: Response) {
  const { project_id } = req.params;
  console.log("deleteProject")

  try {
    const project = await  prisma.projects.delete({
      where: {
        id: parseInt(project_id)
      }
    });
    console.log("project deleted",project);
    res.sendStatus(204);

  } catch (db_error) {
    res.status(404).json({ error: "Project not found", db_error });
  }
 
}


export { getAllProjects, getProject, createProject, updateProject, deleteProject};
