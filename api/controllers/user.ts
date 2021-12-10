import { Request, Response } from 'express';

async function getAllUsers(req: Request, res: Response) {
  console.log("getAllUsers")
    res.sendStatus(200);
}

async function getUser( req: Request, res: Response){
  const { user_id } = req.params;
  console.log("getUser")

  res.sendStatus(204);
}

async function createUser(req: Request, res: Response) {
  console.log("createUser")
  res.sendStatus(204);
}

async function updateUser(req: Request, res: Response) {
  const { user_id } = req.params;
  console.log("updateUser")
  res.sendStatus(204);
}

async function deleteUser(req: Request, res: Response) {
  const { user_id } = req.params;
  const {query} = req;

  console.log("deleteUser")
  res.sendStatus(204);
}





export { getAllUsers, getUser, createUser, updateUser, deleteUser};
