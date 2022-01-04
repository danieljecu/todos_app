import { AxiosResponse } from "axios";
import axiosInstance from "../utils/axiosInstance";

import { ITaskDetails } from "../interfaces";

const getTasks = (): Promise<AxiosResponse<ITaskDetails[]>> => {
  return axiosInstance.get<ITaskDetails[]>("/task");
};

const TaskService = {
  getTasks,
};

export default TaskService;