import { AxiosResponse } from "axios";
import client from "../utils/api-client";

import { ITaskDetails } from "../interfaces";

const getTasks = (): Promise<AxiosResponse<ITaskDetails[]>> => {
  return client.get<ITaskDetails[]>("/task");
};

const getTasksByTasklistId = (
  tasklistId: number
): Promise<AxiosResponse<ITaskDetails[]>> => {
  return client.get<ITaskDetails[]>(`/task?tasklist=${tasklistId}`);
};

const createTask = (
  tasklistId: number,
  body: ITaskDetails
): Promise<AxiosResponse<ITaskDetails>> => {
  return client.post<ITaskDetails>(`/task?tasklist=${tasklistId}`, body);
};

const deleteTaskById = (
  taskId: number
): Promise<AxiosResponse<ITaskDetails>> => {
  return client.delete<ITaskDetails>(`/task/${taskId}`);
};

const updateTaskById = (
  taskId: number,
  body: ITaskDetails
): Promise<AxiosResponse<ITaskDetails>> => {
  return client.put<ITaskDetails>(`/task/${taskId}`, body);
};

const TaskService = {
  getTasksByTasklistId,
  getTasks,
  createTask,
  deleteTaskById,
  updateTaskById,
};

export default TaskService;
