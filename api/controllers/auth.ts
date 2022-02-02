import { Request, Response } from "express";
import { prisma } from "./../utils/db_client";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  expiresIn,
} from "../middlewares/checkJwt";
import { UserService } from "./../services";

// Note: we dont need to chec if (expiresIn<= now) because we verify the token
// [ ] we can use cookies to store the token
async function refreshToken(req: Request, res: Response) {
  const { refreshToken } = req.body;

  console.log("refreshToken ", refreshToken);
  const token = req.headers.authorization?.split(" ")[1];

  let jwtPayload;
  //Verify token
  try {
    jwtPayload = <any>jwt.verify(String(refreshToken), REFRESH_TOKEN_SECRET);
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send({ error });
    return;
  }

  //Check if user still exists
  // TODO: i should also check refreshToken in the db and set it at login
  const user = await UserService.getUserById(jwtPayload.id);
  if (!user) {
    res.status(401).send();
    return;
  }

  const newToken = createAccessToken(jwtPayload);
  // res.setHeader("token", newToken);
  res.status(200).send({ accesTocken: newToken });

  console.log("refreshToken");
}

async function login(req: Request, res: Response) {
  // input: login recive an email and password
  console.log("login");
  try {
    // Ger user by email
    const { email, password } = req.body;
    const userByEmail = await UserService.getUserByEmail(email);

    if (!userByEmail) {
      return res.status(401).json({ error: "Unauthorised, User not found" });
    }

    // Check if password is correct
    const passwordsMatchCheck = await bcrypt.compare(
      password,
      userByEmail.password!
    );
    if (!passwordsMatchCheck) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Unauthorised, Password is incorrect" }] });
    }

    if (passwordsMatchCheck) {
      // returns or gives the user a token(access token, refresh token)
      res.status(200).json({
        user: { ...userByEmail, password: undefined },
        succes: true,
        accessToken: createAccessToken(<User>userByEmail),
        refreshToken: createRefreshToken(<User>userByEmail),
      });
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
    // [x] email lookup
    // TODO: make email unique
    let user = await UserService.getUserByEmail(email);

    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = UserService.createNewUser({
      username,
      email,
      hashPassword,
    });

    //Note: Only with login we send tokens back

    res.status(201).json({ user: newUser });
  } catch (db_error) {
    res.status(500).json(db_error);
  }
}

interface User {
  id: number;
  username?: string;
  email: string;
  password?: string;
}

export const createAccessToken = (user: User) => {
  return jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, {
    expiresIn, //"15m",
  });
};

export const createRefreshToken = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email, //tokenVersion: user.tokenVersion
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export { refreshToken, login, createUser };
