import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../../controllers/project";
import {
  getAllTasklists,
  getTasklist,
  createTasklist,
  updateTasklist,
  deleteTasklist,
} from "../../controllers/tasklist";
// import { TasklistRouter } from '..';
//TODO: fiix routes import
import express, { Router } from "express";
import {
  check,
  param,
  body,
  validationResult,
  sanitizeParam,
} from "express-validator";
import generalValidate from "../generalValidate";

const ProjectRouter = Router();
ProjectRouter.get("/", generalValidate, getAllProjects);

ProjectRouter.get(
  "/:project_id",
  [
    param("project_id")
      .exists()
      .withMessage("project_id must exist ProjectRouter"),
    param("project_id").isNumeric().withMessage("project_id must be numeric"),
  ],
  generalValidate,
  getProject
);

ProjectRouter.post(
  "/",
  check("name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("name longer than 3 characters"),
  generalValidate,
  createProject
);

ProjectRouter.put(
  "/:project_id([0-9]+)",
  check("name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("name longer than 3 characters"),
  generalValidate,
  updateProject
);

ProjectRouter.delete(
  "/:project_id([0-9]+)",
  param("project_id").isNumeric().withMessage("project_id must be numeric"),
  generalValidate,
  deleteProject
);

//////// "/:project_id/tasklist"

const TasklistRouter = Router({ mergeParams: true });

TasklistRouter.get(
  "/",
  param("project_id")
    .isNumeric()
    .withMessage("project_id must be numeric TasklistRouter"),
  generalValidate,
  getAllTasklists
);

TasklistRouter.get(
  "/:tasklist_id([0-9]+)",
  // param('project_id').isNumeric().withMessage("project_id must be numeric"),
  param("tasklist_id").isNumeric().withMessage("tasklist_id must be numeric"),
  generalValidate,
  getTasklist
);

TasklistRouter.post(
  "/",
  param("project_id").isNumeric().withMessage("project_id must be numeric"),
  generalValidate,
  createTasklist
);

TasklistRouter.put(
  "/:tasklist_id([0-9]+)",
  param("project_id").isNumeric().withMessage("project_id must be numeric"),
  param("tasklist_id").isNumeric().withMessage("tasklist_id must be numeric"),
  generalValidate,
  updateTasklist
);
TasklistRouter.delete(
  "/:tasklist_id([0-9]+)",
  param("project_id").isNumeric().withMessage("project_id must be numeric"),
  param("tasklist_id").isNumeric().withMessage("tasklist_id must be numeric"),
  generalValidate,
  deleteTasklist
);

// you can nest routers by attaching them as middleware:
ProjectRouter.use("/:project_id/tasklist", TasklistRouter);

export default ProjectRouter;
