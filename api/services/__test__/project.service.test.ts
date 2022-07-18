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
      const mockProject = {
        id: 1,
        name: "Project 1",
        task_lists: [],
      };

      //Mocking prisma
      prismaAsAny.projects = {
        findUnique: jest.fn().mockReturnValueOnce(mockProject),
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

  describe("createOne", () => {
    it("Should return a create promise", async () => {
      const mockProject = {
        id: 1,
        name: "Project 1",
        task_lists: [],
        user_id: 1,
      };

      //Mocking prisma
      prismaAsAny.projects = {
        create: jest.fn().mockReturnValueOnce(mockProject),
      };
      const body = { projectName: "Project 1", user_id: 1 };

      const result = await ProjectService.createProject(
        body.projectName,
        body.user_id
      );

      expect(prisma.projects.create).toHaveBeenCalledTimes(1);
      expect(prisma.projects.create).toHaveBeenCalledWith({
        data: {
          name: body.projectName,
          project_users: { create: [{ user_id: body.user_id }] },
        },
      });
      expect(result).toEqual(mockProject);
    });
  });

  // describe("deleteOne", () => {
  //   it("given a project_id Should return an delete promise", async () => {
  //     const project_id: string = "1";
  //     // prismaAsAny.user = {
  //     //   updateMany: jest.fn().mockReturnValueOnce(mutation),
  //     // };
  //     const mockReturnValue = { id: project_id, isDeleted: true };
  //     prismaAsAny.project = {
  //       delete: jest.fn().mockReturnValueOnce(mockReturnValue),
  //     };

  //     // let res = { status: jest.fn().mockReturnValue(res) };

  //     const result = await ProjectService.deleteProject(project_id);

  //     expect(prisma.projects.delete).toHaveBeenCalledTimes(1);
  //     // expect(res.status).toHaveBeenCalledWith(204);

  //     expect(result).toEqual(mockReturnValue);
  //   });
  // });

  describe("updateOne", () => {
    it("Should return a mutation", async () => {
      const mockProject = {
        id: "1",
        name: "Project 1 updated",
        task_lists: [],
        user_id: 1,
      };

      //Mocking prisma
      prismaAsAny.projects = {
        update: jest.fn().mockReturnValueOnce(mockProject),
      };
      const body = { projectName: "Project 1 updated", project_id: "1" };

      const result = await ProjectService.updateProject(
        body.project_id,
        body.projectName
      );

      expect(prisma.projects.update).toHaveBeenCalledTimes(1);
      expect(prisma.projects.update).toHaveBeenCalledWith({
        where: {
          id: parseInt(body.project_id),
        },
        data: {
          name: body.projectName,
        },
      });
      expect(result).toEqual(mockProject);
    });
  });
});
