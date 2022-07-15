import * as ProjectController from "../project";
import { ProjectService } from "../../services";
import { when } from "jest-when";
import { Request, Response } from "express";

// jest.mock("../../services");

interface mockRequestArgs {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  token?: string;
}

const mockRequest = (args: mockRequestArgs) => {
  const get = (name: string) => {
    if (name === "authorization") return `Bearer ${args.token}`;
    return null;
  };

  return {
    ...args,
    get,
  } as unknown as Request;
};

const mockResponse = () => {
  const res = {} as Response;
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("calculate", function () {
  it("add", async () => {
    let result = ProjectController.Sum(5, 2);
    console.log("returns a promise with a value", result);
    expect(await result).toBe(7);
  });
});

describe("/project route Controller", () => {
  //TODO: test controller means calling the service and then expect {body AND statusCode}

  describe("given user is not logged in", () => {});
  describe("given user is logged in", () => {
    // beforeEach(() => {
    //   jest.clearAllMocks();
    // });
    describe("getProject", () => {
      it("get the project by project id", async () => {
        // arrange
        const project_id = "1";
        const req = { params: { project_id: "1" } };
        // const res = {
        //   status: () => 200,
        //   body: { id: 1, name: "Project 1", task_lists: [] },
        // };
        // const req = mockRequest({
        //   params: { project_id },
        //   query: {},
        // });
        const res = mockResponse();

        const mockReturnValue = {
          id: 1,
          name: "Project 1",
          task_lists: [],
        };

        jest
          .spyOn(ProjectService, "getProjectById")
          .mockImplementation((): any => mockReturnValue);

        //WHY THE jest-WHEN is not working?
        // when(ProjectService.getProjectById)
        //   .calledWith("1")
        //   .mockReturnValueOnce(Promise.resolve(mockReturnValue));

        /////act
        await ProjectController.getProject(req as any, res as any);

        // assert

        // expect(res.body.name).toEqual("Project 1");

        //expect calls the ProjectService.getProjectById()
        expect(ProjectService.getProjectById).toHaveBeenCalledTimes(1);
        expect(ProjectService.getProjectById).toHaveBeenLastCalledWith(
          req.params.project_id
        );
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(mockReturnValue);
      });
    });

    describe("getAllProjects", () => {
      it("should return status 200 and an array of projects", async () => {
        const mockReturnValue = {
          id: 1,
          name: "Project 1",
          task_lists: [],
        };

        const req = mockRequest({
          params: {},
          query: {},
        });

        const res = mockResponse();
        const result = [mockReturnValue];
        jest
          .spyOn(ProjectService, "getProjectsWithTasklistIds")
          .mockImplementation((): any => result);

        // when(ProjectService.getProjectsWithTasklistIds)
        //   .calledWith("1" as any)
        //   .mockReturnValueOnce(Promise.resolve([mockReturnValue]));

        await ProjectController.getProject(req, res);

        expect(await ProjectService.getProjectsWithTasklistIds()).toBe(result);
        expect(ProjectService.getProjectsWithTasklistIds).toHaveBeenCalledTimes(
          1
        );
        expect(
          ProjectService.getProjectsWithTasklistIds
        ).toHaveBeenLastCalledWith();
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledTimes(1);

        expect(res.json).toHaveBeenCalledWith(mockReturnValue);
        // expect(res.json).toHaveBeenCalledWith();
      });

      xit("should return 204 no content when there are no projects", async () => {
        const project_id = "1";
        const query = {};

        const req = mockRequest({
          params: { project_id },
          query,
        });

        const res = mockResponse();

        const mockReturnValue = {
          id: 1,
          name: "Project 1",
          task_lists: [],
        };

        // when(ProjectService.getProjectsWithTasklistIds)
        //   .calledWith()
        //   .mockReturnValueOnce(Promise.resolve([mockReturnValue]));

        // await ProjectController.getAllProjects(req, res);

        // expect(ProjectService.getProjectsWithTasklistIds).toHaveBeenCalledTimes(
        //   1
        // );
        // expect(
        //   ProjectService.getProjectsWithTasklistIds
        // ).toHaveBeenLastCalledWith();
        // expect(res.sendStatus).toHaveBeenCalledTimes(1);
        // expect(res.sendStatus).toHaveBeenCalledWith(204);

        const result: any[] = [];
        jest
          .spyOn(ProjectService, "getProjectsWithTasklistIds")
          .mockImplementation((): any => result);

        await ProjectController.getProject(req, res);

        expect(await ProjectService.getProjectsWithTasklistIds()).toBe(result);
        expect(ProjectService.getProjectsWithTasklistIds).toHaveBeenCalledTimes(
          1
        );
        expect(
          ProjectService.getProjectsWithTasklistIds
        ).toHaveBeenLastCalledWith();
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledTimes(1);
      });
    });
    xdescribe("createProject", () => {
      it("should return 200 when created", async () => {
        const project_id: string = "1";
        const tenantUserId = 1;

        const body = {
          id: 1,
          name: `Mario's Pizzeria project`,
          task_lists: [],
        };

        const req = mockRequest({
          headers: { project_id, tenantUserId },
          body,
        });

        const res = mockResponse();

        when(ProjectService.createProject)
          .calledWith(body.name)
          .mockReturnValueOnce(
            Promise.resolve({
              project_id,
              ...body,
            })
          );

        await ProjectController.createProject(req, res);

        expect(ProjectService.createProject).toHaveBeenCalledTimes(1);
        expect(ProjectService.createProject).toHaveBeenLastCalledWith(
          project_id,
          body
        );
        expect(res.sendStatus).toHaveBeenCalledTimes(1);
        expect(res.sendStatus).toHaveBeenCalledWith(200);
      });
    });
    xdescribe("updateProject", () => {
      it("should return 200 when updating", async () => {
        const project_id: string = "1";
        const body = {
          name: "Website Development UPDATED",
        };

        const req = mockRequest({
          params: { project_id },
          body,
        });

        const res = mockResponse();

        when(ProjectService.updateProject)
          .calledWith(project_id, body.name)
          .mockReturnValueOnce(Promise.resolve({ id: 99, name: "eee" }));

        await ProjectController.updateProject(req, res);

        expect(ProjectService.updateProject).toHaveBeenCalledTimes(1);
        expect(ProjectService.updateProject).toHaveBeenLastCalledWith(
          project_id,
          body.name
        );
        expect(res.sendStatus).toHaveBeenCalledTimes(1);
        expect(res.sendStatus).toHaveBeenCalledWith(200);
      });
    });
    xdescribe("deleteProject", () => {
      it("should return 200 when deleting", async () => {
        const project_id = 1;
        const id = 1;

        const req = mockRequest({
          headers: { project_id },
          params: { id },
        });

        const res = mockResponse();

        // when(ProjectService.deleteProject).calledWith(id).mockReturnValueOnce;
        // Promise.resolve([mutation, mutation, mutation, mutation])();

        await ProjectController.deleteProject(req, res);

        expect(ProjectService.deleteProject).toHaveBeenCalledTimes(1);
        expect(ProjectService.deleteProject).toHaveBeenLastCalledWith(
          project_id
        );
        expect(res.sendStatus).toHaveBeenCalledTimes(1);
        expect(res.sendStatus).toHaveBeenCalledWith(200);
      });
    });
  });
});
