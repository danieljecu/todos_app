import axiosInstance from "../utils/axiosInstance";

import { ITasklistDetails } from '../interfaces';

const getTasklistsByProjectId = async (projectId: number): Promise<ITasklistDetails[]> => {
  console.log(projectId);
  if (projectId !== undefined || projectId !== null) {
    return (await axiosInstance.get<ITasklistDetails[]>('/project/' + projectId + '/tasklist')).data;
  }
  return [];
    //return axiosInstance.get<ITasklistDetails[]>('/tasklist');
    //return axiosInstance.get<ITasklistDetails[]>(`/tasklist?projectId=${projectId}`);
};

const createTasklist = async (tasklist: ITasklistDetails): Promise<ITasklistDetails> => {
  return (await axiosInstance.post<ITasklistDetails>('/tasklist', tasklist)).data;
};


const TasklistService = {
  getTasklistsByProjectId,
  createTasklist,
};

export default TasklistService;