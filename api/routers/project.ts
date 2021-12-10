import { getAllProjects, getProject, createProject,updateProject, deleteProject } from '../controllers/project';
import { Router } from 'express';

const ProjectRouter = Router();
ProjectRouter.route("/").get(getAllProjects);
ProjectRouter.route("/:project_id").get(getProject);

ProjectRouter.route("/").post(createProject)
ProjectRouter.route("/:project_id").put(updateProject)
ProjectRouter.route("/:project_id").delete(deleteProject)



export default ProjectRouter;