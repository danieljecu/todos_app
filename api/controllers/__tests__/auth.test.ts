import * as AuthController from "../auth.controller";
import * as UserService from "../../services/user.service";
import { when } from "jest-when";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  expiresIn,
} from "../../middlewares/checkJwt";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../../services/user.service");

//mock UserService
describe("auth Controller", () => {
  describe("login", () => {});
});

describe("auth Controller", () => {
  describe("login", () => {
    // CHECKs:
    //- if the email doesn't exist
    //- if the password is not valid
    //- if the email is valid and the password is valid
    it("should return 401", () => {
      // expect(res.status).toHaveBeenCalledWith(401);
    });
    it("should return 200 Response when member authenticated", async () => {
      // arrange
      const email = "email";
      const passwordInput = "password";
      const accessToken = "access";
      const refreshToken = "refresh";
      const userByEmail = {
        id: 6,
        email: "test22@test.com",
        username: null,
        password:
          "$2a$10$TDjOVKZ0qd3YlnkwBBGESuSyhz9UOjPxiRrn/9x8aLhzuIiJ39paS",
        first_name: null,
        last_name: null,
      };
      // jest
      //   .spyOn(AuthController, "login")
      //   .mockImplementation((req, res): any => result);

      const req = {
        body: {
          email: email,
          password: passwordInput,
        },
      };

      const res: any = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      let jwt_access_payload = [
        { id: userByEmail.id, email: userByEmail.email },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        },
      ];
      let jwt_refresh_payload = [
        { id: userByEmail.id, email: userByEmail.email },
        REFRESH_TOKEN_SECRET,
        {
          expiresIn: "7d",
        },
      ];

      // ACT
      // AuthController.login = jest.fn();
      when(UserService.getUserByEmail)
        .calledWith(email)
        .mockReturnValueOnce(<any>userByEmail);

      when(bcrypt.compare)
        .calledWith(passwordInput, userByEmail.password)
        .mockReturnValueOnce(true as any);

      when(jwt.sign)
        .calledWith(jwt_access_payload as any)
        .mockReturnValueOnce(accessToken as any);

      when(jwt.sign)
        .calledWith(<any>jwt_refresh_payload)
        .mockReturnValueOnce(refreshToken as any);

      const token = {
        accessToken: jwt.sign(
          { id: userByEmail.id, email: userByEmail.email },
          ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15m",
          }
        ),
        refreshToken: jwt.sign(
          { id: userByEmail.id, email: userByEmail.email },
          REFRESH_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        ),
      };

      //act
      await AuthController.login(req as any, res as any);

      // assert
      expect(UserService.getUserByEmail).toHaveBeenCalledWith(email);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);

      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        passwordInput,
        userByEmail.password
      );

      expect(jwt.sign).toHaveBeenCalledTimes(4);
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining(jwt_access_payload[0]),
        ACCESS_TOKEN_SECRET,
        expect.objectContaining({ expiresIn: "15m" })
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining(jwt_refresh_payload[0]),
        REFRESH_TOKEN_SECRET,
        expect.objectContaining({ expiresIn: "7d" })
      );
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        })
      );
    });
  });
});
