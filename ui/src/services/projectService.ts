import { AxiosResponse } from "axios";
import axiosInstance from "../utils/axiosInstance";

import { IProjectDetails } from '../interfaces';

const getProjects = (): Promise<AxiosResponse<IProjectDetails[]>> => {
  return axiosInstance.get<IProjectDetails[]>('/project');
};


const ProjectService = {
  getProjects
};

export default ProjectService;