import { Request, Response } from "express";
import prisma from "./db_service";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { JWT_SECRET_KEY, expiresIn } from "../middlewares/checkJwt";

async function refreshToken(req: Request, res: Response) {
  // const { refresh_token } = req.query;
  //recieve an refresh token from and sends an access token

  // res.json({ token: token, newToken });

  console.log("refreshToken");
}

async function login(req: Request, res: Response) {
  // input: login recive an email and password
  console.log("login");

  // Ger user by email
  const { email } = req.body;
  const userByEmail = await prisma.users.findFirst({
    where: {
      email: email ? { equals: String(email) } : undefined,
    },
  });
  if (!userByEmail) {
    res.status(401).json({ error: "Unotorised, User not found" });
  }
  console.log("find user by email", userByEmail);

  // Check if password is correct
  try {
    const passwordsMatchCheck = await bcrypt.compare(
      req.body.password,
      <string>userByEmail?.password
    );
    console.log("match", passwordsMatchCheck);

    if (passwordsMatchCheck) {
      const accessToken = jwt.sign({ id: userByEmail?.id }, JWT_SECRET_KEY, {
        expiresIn,
      });

      // returns or gives the user a token(access token, refresh token)
      res
        .status(200)
        .json({ user: userByEmail, succes: true, accessToken: accessToken });
    } else {
      res.status(401).json({ error: "Password incorrect" });
    }
  } catch (db_error) {
    res.status(500).json(db_error);
  }
}

async function createUser(req: Request, res: Response) {
  console.log("createUser");
  try {
    const { username, email } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);

    // console.log("createUser", username, email, password);
    // email lookup
    // TODO make email unique
    let user = await prisma.users.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (user) {
      res.status(409).json({ error: "User already exists" });
    } else {
      user = await prisma.users.create({
        data: {
          username: username,
          email: email,
          password: password,
        },
      });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET_KEY,
      {
        expiresIn,
      }
    );

    res.status(201).json({ user: user, access_token: accessToken, expiresIn });
  } catch (db_error) {
    res.status(500).json(db_error);
  }
}

export { refreshToken, login, createUser };
