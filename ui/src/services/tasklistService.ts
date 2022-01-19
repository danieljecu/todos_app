import axiosInstance from "../utils/axiosInstance";

import { ITasklistDetails } from "../interfaces";

const getTasklistsByProjectId = async (
  projectId: number
): Promise<ITasklistDetails[]> => {
  console.log(projectId);
  if (projectId !== undefined || projectId !== null) {
    return (
      await axiosInstance.get<ITasklistDetails[]>(
        "/project/" + projectId + "/tasklist"
      )
    ).data;
  }
  return [];
  //return axiosInstance.get<ITasklistDetails[]>('/tasklist');
  //return axiosInstance.get<ITasklistDetails[]>(`/tasklist?projectId=${projectId}`);
};

const createTasklist = async (
  projectId: number | string,
  tasklist: ITasklistDetails
): Promise<ITasklistDetails> => {
  return (
    await axiosInstance.post<ITasklistDetails>(
      `project/${projectId}/tasklist`,
      tasklist
    )
  ).data;
};

const deleteTasklist = async (
  projectId: number | string,
  tasklistId: number | string
): Promise<ITasklistDetails> => {
  return (
    await axiosInstance.delete<ITasklistDetails>(`project/${projectId}/tasklist/${tasklistId}`)
  ).data;
};

const updateTasklist = async (
  projectId: number | string,
  tasklistId: number,
  tasklist: ITasklistDetails
): Promise<ITasklistDetails> => {
  return (
    await axiosInstance.put<ITasklistDetails>(
      `project/${projectId}/tasklist/${tasklistId}`,
      tasklist
    )
  ).data;
};

const TasklistService = {
  getTasklistsByProjectId,
  createTasklist,
  deleteTasklist,
  updateTasklist
};

export default TasklistService;
