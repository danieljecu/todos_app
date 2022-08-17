import { AxiosResponse } from "axios";
import client from "../utils/api-client";

import { IProjectDetails } from "../interfaces";

const getProjects = (): Promise<AxiosResponse<IProjectDetails[]>> => {
  return client.get<IProjectDetails[]>("/project");
};
const getProject = (
  projectId: number
): Promise<AxiosResponse<IProjectDetails>> => {
  return client.get<IProjectDetails>(`/project/${projectId}`);
};

const createProject = (
  body: IProjectDetails
): Promise<AxiosResponse<IProjectDetails>> => {
  return client.post<IProjectDetails>("/project", body);
};

const removeProjectById = (
  projectId: number
): Promise<AxiosResponse<IProjectDetails>> => {
  return client.delete<IProjectDetails>(`/project/${projectId}`);
};

const updateProjectById = (
  projectId: number | string,
  body: IProjectDetails
): Promise<AxiosResponse<IProjectDetails>> => {
  return client.put<IProjectDetails>(`/project/${projectId}`, body);
};

const ProjectService = {
  getProjects,
  getProject,
  createProject,
  removeProjectById,
  updateProjectById,
};

export default ProjectService;
