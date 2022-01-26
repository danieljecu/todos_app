import { Request, Response } from "express";
import prisma from "./db_service";
import * as bcrypt from "bcryptjs";

async function getAllUsers(req: Request, res: Response) {
  const { email } = req.query;

  console.log("getAllUsers");

  try {
    const users = await prisma.users.findMany({
      where: {
        email: email ? { equals: String(email) } : undefined,
      },
    });

    if (users && users.length > 0) {
      res.status(200).json(users);
    }
    if (users && users.length == 0) {
      res.status(204).json(users);
    }
  } catch (error) {
    res.status(404).json(error);
  }
}

async function getUser(req: Request, res: Response) {
  const { user_id } = req.params;

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(user_id),
      },
      select: {
        id: true,
        username: true,
      },
    });

    console.log("getUser", user);

    res.status(200).json(user);
  } catch (db_error) {
    res.status(404).json(db_error);
  }
}

async function createUser(req: Request, res: Response) {
  console.log("createUser");
  try {
    const { username, email } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);

    // console.log("createUser", username, email, password);
    // const userByEmail = await prisma.users.findMany({
    //   where: {
    //     email: email,
    //   },
    //   select: {
    //     id: true,
    //     username: true,
    //   },
    // });
    // console.log("create user find by email", userByEmail);

    const user = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    res.status(201).json({ user: user });
  } catch (db_error) {
    res.status(500).json(db_error);
  }
}

async function updateUser(req: Request, res: Response) {
  const { user_id } = req.params;
  const { username, email, password } = req.body;

  console.log("updateUser", user_id, username, email);
  try {
    const user = await prisma.users.update({
      where: {
        id: parseInt(user_id),
      },
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    res.sendStatus(204).json(user);
  } catch (db_error) {
    res.status(400).json({ error: "user not found", db_error });
  }
}

async function deleteUser(req: Request, res: Response) {
  const { user_id } = req.params;

  try {
    const user = await prisma.users.delete({
      where: {
        id: parseInt(user_id),
      },
    });

    console.log("deleteUser", user);
    res.status(204).json(user);
  } catch (db_error) {
    res.status(404).json({ error: "user not found", db_error });
  }
}

export { getAllUsers, getUser, updateUser, deleteUser };
