import { AxiosResponse } from "axios";
import axiosInstance from "../utils/axiosInstance";

import { ITasklistDetails } from '../interfaces';

const getTasklists = (): Promise<AxiosResponse<ITasklistDetails[]>> => {
  return axiosInstance.get<ITasklistDetails[]>('/tasklist');
};


const TasklistService = {
  getTasklists
};

export default TasklistService;