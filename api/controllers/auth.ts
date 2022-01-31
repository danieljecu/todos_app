import { Request, Response } from "express";
import { prisma } from "./../utils/db_client";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { JWT_SECRET_KEY, expiresIn } from "../middlewares/checkJwt";

async function refreshToken(req: Request, res: Response) {
  // const { refresh_token } = req.query;
  //recieve an refresh token from and sends an access token

  //if the acces token expired we need refresh token
  // the refresh tocken will be sent along with the refresh token

  //if (expiresIn<= now){
  //send a new access token

  // res.json({ token: token, newToken });

  // const token = req.cookies.jid;
  //   if (!token) {
  //     return res.send({ ok: false, accessToken: "" });
  //   }

  //   let payload: any = null;
  //   try {
  //     payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  //   } catch (err) {
  //     console.log(err);
  //     return res.send({ ok: false, accessToken: "" });
  //   }

  //   // token is valid and
  //   // we can send back an access token
  //   const user = await User.findOne({ id: payload.userId });

  //   if (!user) {
  //     return res.send({ ok: false, accessToken: "" });
  //   }

  //   if (user.tokenVersion !== payload.tokenVersion) {
  //     return res.send({ ok: false, accessToken: "" });
  //   }

  //   sendRefreshToken(res, createRefreshToken(user));

  //   return res.send({ ok: true, accessToken: createAccessToken(user) });

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
    return res.status(401).json({ error: "Unauthorised, User not found" });
  }

  // Check if password is correct
  try {
    const passwordsMatchCheck = await bcrypt.compare(
      req.body.password,
      userByEmail.password!
    );

    if (passwordsMatchCheck) {
      const accessToken = jwt.sign({ id: userByEmail.id }, JWT_SECRET_KEY, {
        expiresIn,
      });

      // returns or gives the user a token(access token, refresh token)
      res.status(200).json({
        user: userByEmail,
        succes: true,
        accessToken: accessToken,
        // , refreshToken: refreshToken //TODO diffrent secrets
      });
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
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

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
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: hashPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    //Only with login
    // const accessToken = jwt.sign(
    //   { id: user.id, email: user.email },
    //   JWT_SECRET_KEY,
    //   {
    //     expiresIn,
    //   }
    // );

    res.status(201).json({ user: newUser });
  } catch (db_error) {
    res.status(500).json(db_error);
  }
}

export { refreshToken, login, createUser };
