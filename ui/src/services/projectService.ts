import { AxiosResponse } from "axios";
import axiosInstance from "../utils/axiosInstance";

import { IProjectDetails } from "../interfaces";

const getProjects = (): Promise<AxiosResponse<IProjectDetails[]>> => {
  return axiosInstance.get<IProjectDetails[]>("/project");
};
const getProject = (
  projectId: number
): Promise<AxiosResponse<IProjectDetails>> => {
  return axiosInstance.get<IProjectDetails>(`/project/${projectId}`);
};

const createProject = (
  body: IProjectDetails
): Promise<AxiosResponse<IProjectDetails>> => {
  return axiosInstance.post<IProjectDetails>("/project", body);
};

const removeProjectById = (
  projectId: number
): Promise<AxiosResponse<IProjectDetails>> => {
  return axiosInstance.delete<IProjectDetails>(`/project/${projectId}`);
};

const updateProjectById = (
  projectId: number | string,
  body: IProjectDetails
): Promise<AxiosResponse<IProjectDetails>> => {
  return axiosInstance.put<IProjectDetails>(`/project/${projectId}`, body);
};

const ProjectService = {
  getProjects,
  getProject,
  createProject,
  removeProjectById,
  updateProjectById,
};

export default ProjectService;
