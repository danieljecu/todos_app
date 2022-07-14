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
      const mockReturnValue = {
        id: 1,
        name: "Project 1",
        task_lists: [],
      };
      prismaAsAny.projects = {
        findUnique: jest.fn().mockReturnValueOnce(mockReturnValue),
      };

      // arrange
      const req = { params: { project_id: 1 } };
      const res = {
        status: 200,
        body: { id: 1, name: "Project 1", task_lists: [] },
      };

      when(ProjectService.getProjectById)
        .calledWith(project_id)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      // assert
      expect(
        await ProjectService.getProjectById(String(req.params.project_id))
      ).toBe(res); // this would be service testing

      const result = await ProjectService.getProjectById(project_id);

      expect(prisma.projects.findUnique).toHaveBeenCalledTimes(1);
      // expect(prisma.account.findMany).toHaveBeenCalledWith(
      //     expect.objectContaining({
      //         where: {
      //             tenantId,
      //             isDeleted: false,
      //         },
      //   }));
      // expect(result).toEqual(mockAccounts);
    });
  });
});
