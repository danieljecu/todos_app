import { Request, Response } from 'express';
import prisma from './db_service';


async function getAllTasklists(req: Request, res: Response) {
  const { project_id } = req.params;
  console.log("proID",project_id)
  const tasklists = await prisma.task_lists.findMany({
    where: {
      project_id: parseInt(project_id),
    },
    select:{
      id: true,
      name: true,
      project_id: true
    }
  });
  console.log("getAllTasklists",tasklists);

  if (tasklists?.length > 0) {
    res.status(200).json(tasklists);
    } else {
      res.sendStatus(404);
    }
  }

async function getTasklist( req: Request, res: Response){
  const { project_id, tasklist_id } = req.params;
  console.log("getTasklist")

  //TODO why is not working
  try{
  const tasklist= await prisma.task_lists.findUnique({
    where: {
      id: parseInt(tasklist_id),
    },
    select:{
      id: true,
      name:true,
      project_id:true
    }
  });

  res.status(200).json(tasklist);
} catch (db_error) {
  res.status(404).json({error:"test get tasklist error" ,db_error});
}

}

async function createTasklist(req: Request, res: Response) {
  const { project_id } = req.params;
  const { name } = req.body;

  console.log("createTasklist",project_id,name)

  try{
  const tasklist = await prisma.task_lists.create({
    data:{
      name: name,
      // project_id: project_id
    }
  });

    res.status(201).json(tasklist);

  }catch(db_error){
    res.status(404).json(db_error);
  }
}

async function updateTasklist(req: Request, res: Response) {
  const { project_id, tasklist_id } = req.params;
  const { name } = req.body;

  console.log("updateTasklist")

  try {
  const tasklist= await prisma.task_lists.update({
    where: {
      id: parseInt(tasklist_id),
      // TODO: is necessary to add to as pecific project_id: parseInt(project_id),
    },
    data: {
      name: name,
    }
    });
    res.status(204).json(tasklist);
  } catch (db_error) {
    res.status(400).json({ error: "project not found", db_error });
  }}

async function deleteTasklist(req: Request, res: Response) {
  const { project_id, tasklist_id } = req.params;

  try {
    const tasklist = await prisma.task_lists.delete({
      where: {
        id: parseInt(tasklist_id),
      }
    });
    console.log("deleteTasklist")
    res.sendStatus(200).json(tasklist);
  
    }catch(db_error){
    res.status(404).json({error: "tasklist not found",db_error});
  }
  


}

export { getAllTasklists, getTasklist, createTasklist, updateTasklist, deleteTasklist} ;
