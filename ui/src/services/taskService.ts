import { AxiosResponse } from "axios";
import axiosInstance from "../utils/axiosInstance";

import { ITaskDetails } from "../interfaces";

const getTasks = (): Promise<AxiosResponse<ITaskDetails[]>> => {
  return axiosInstance.get<ITaskDetails[]>("/task");
};

const getTasksByTasklistId = (tasklistId: number): Promise<AxiosResponse<ITaskDetails[]>> => {
  return axiosInstance.get<ITaskDetails[]>(`/task?tasklist=${tasklistId}`);
};

const createTask = (tasklistId: number, body: ITaskDetails): Promise<AxiosResponse<ITaskDetails>> => {
  return axiosInstance.post<ITaskDetails>(`/task?tasklist=${tasklistId}`, body);
};

const deleteTaskById = (taskId: number): Promise<AxiosResponse<ITaskDetails>> => {
  return axiosInstance.delete<ITaskDetails>(`/task/${taskId}`);
};

const updateTaskById = (taskId: number, body: ITaskDetails): Promise<AxiosResponse<ITaskDetails>> => {
  return axiosInstance.put<ITaskDetails>(`/task/${taskId}`, body);
};


const TaskService = {
  getTasksByTasklistId,
  getTasks,
  createTask,
  deleteTaskById,
  updateTaskById
};

export default TaskService;