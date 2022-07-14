import * as ProjectController from "../project";
import { ProjectService } from "../../services";
import { when } from "jest-when";
import { Request, Response } from "express";

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

describe("/project route Controller", () => {
  //TODO: test controller means calling the service and then expect {body AND statusCode}
  //   beforeEach(() => {
  //     projectService = new projectService();
  //     projectController = new projectController(projectService);
  // });

  describe("calculate", function () {
    it("add", async () => {
      let result = ProjectController.Sum(5, 2);
      console.log("returns a promise with a value", result);
      expect(await result).toBe(7);
    });
  });
  describe("get project", () => {
    it("get the project with a project id", async () => {
      // arrange
      const req = { params: { project_id: 1 } };
      const res = {
        status: () => 200,
        body: { id: 1, name: "Project 1", task_lists: [] },
      };

      const project_id: string = "1";
      const query = {};

      const mockReturnValue = {
        id: 1,
        name: "Project 1",
        task_lists: [],
      };

      /////act
      await ProjectController.getProject(req as any, res as any);

      when(ProjectService.getProjectById)
        .calledWith(project_id)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      // assert
      expect(
        await ProjectService.getProjectById(String(req.params.project_id))
      ).toBe(res); // this would be service testing

      expect(res.body.name).toEqual("Project 1");
    });

    //expect calls the ProjectService.getProjectById()
  });
  describe("getAllProjects", () => {
    it("should return an array of project 200on success", async () => {
      // let projectController; //: ProjectController;
      // let projectService; //: ProjectService;

      const result = ["test"];
      jest
        .spyOn(ProjectService, "getProjectsWithTasklistIds")
        .mockImplementation((): any => result);

      expect(await ProjectService.getProjectsWithTasklistIds()).toBe(result);
    });
  });

  describe("getPro", () => {
    it("should return 200 and an Project", async () => {
      const project_id: string = "1";

      const req = mockRequest({
        params: { project_id },
        query: {},
      });

      const res = mockResponse();

      const mockReturnValue = {
        id: 1,
        name: "Project 1",
        task_lists: [],
      };

      when(ProjectService.getProjectById)
        .calledWith(project_id)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await ProjectController.getProject(req, res);

      expect(ProjectService.getProjectById).toHaveBeenCalledTimes(1);
      expect(ProjectService.getProjectById).toHaveBeenLastCalledWith(
        project_id
      );
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });

  // // import routes
  // // describe("Test example", () => {
  // //   describe("GET /", (done) => {
  // //     request(app).get("/").expect("Content-Type", /json/).expect(200);
  // //     // More logic goes here
  // //   });
  // //   // More things come here
});
