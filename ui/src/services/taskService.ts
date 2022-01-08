import { AxiosResponse } from "axios";
import axiosInstance from "../utils/axiosInstance";

import { ITaskDetails } from "../interfaces";

const getTasks = (): Promise<AxiosResponse<ITaskDetails[]>> => {
  return axiosInstance.get<ITaskDetails[]>("/task");
};

const getTasksByTasklistId = (tasklistId: number): Promise<AxiosResponse<ITaskDetails[]>> => {
  return axiosInstance.get<ITaskDetails[]>(`/task?tasklist=${tasklistId}`);
};

const TaskService = {
  getTasksByTasklistId,
  getTasks,
};

export default TaskService;