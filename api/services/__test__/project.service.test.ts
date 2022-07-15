// await UserService.getUserByEmail(email); // this is already included in auth controller login
// console.log(await response);
// TODO
// expect(AuthController.login).toHaveBeenCalledWith(req, res);// because is not moked

import { ProjectService } from "../";
import { when } from "jest-when";
import { prisma, prismaAsAny } from "../../utils/db_client";

jest.mock("@prisma/client");
jest.mock("../../utils/db_client");

describe("Project Service", () => {
  describe("get", () => {
    it("Should return an unique project", async () => {
      const project_id: string = "1";
      const mockAccount = {
        id: 1,
        name: "Project 1",
        task_lists: [],
      };

      //Mocking prisma
      prismaAsAny.projects = {
        findUnique: jest.fn().mockReturnValueOnce(mockAccount),
      };

      // arrange
      const req = { params: { project_id: 1 } };
      const res = { id: 1, name: "Project 1", task_lists: [] };

      // assert
      expect(
        await ProjectService.getProjectById(String(req.params.project_id))
      ).toStrictEqual(res); // this would be service testing

      expect(prisma.projects.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteOne", () => {
    xit("Should return an array of projects", async () => {});
  });
});
