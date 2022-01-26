import { Request, Response } from "express";
import prisma from "./db_service";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { JWT_SECRET_KEY } from "../middlewares/checkJwt";

async function refreshToken(req: Request, res: Response) {
  // const { refresh_token } = req.query;
  //recieve an refresh token from and sends an access token
  console.log("refreshToken");
}

async function login(req: Request, res: Response) {
  //login recive an email and password and give you a token(access token, refresh token)
  console.log("login dddd");
  const { email } = req.body;
  const userByEmail = await prisma.users.findFirst({
    where: {
      email: email ? { equals: String(email) } : undefined,
    },
  });

  if (!userByEmail) {
    res.status(401).json({ error: "Unotorised, User not found" });
  }

  // const password = await bcrypt.hash(req.body.password);
  // console.log("passwordbcrit ", password);
  console.log("find user by email", userByEmail);
  try {
    // if (userByEmail && userByEmail.password === password)
    const match = await bcrypt.compare(
      req.body.password,
      <string>userByEmail?.password
    );
    console.log("match", match);

    if (match) {
      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ id: userByEmail?.id }, JWT_SECRET_KEY, {
        expiresIn: expiresIn,
      });
      // const accessToken = jwt.sign({ id: userByEmail?.id },//JSON.stringify(userByEmail),
      // JWT_SECRET_KEY, { expiresIn: "24h" });
      //process.env.TOKEN_SECRET

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
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
      expiresIn: expiresIn,
    });

    res
      .status(201)
      .json({ user: user, access_token: accessToken, expires_in: expiresIn });
  } catch (db_error) {
    res.status(500).json(db_error); //.send("Server error!");
  }
}

export { refreshToken, login, createUser };
