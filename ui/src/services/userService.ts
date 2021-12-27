import { AxiosResponse } from "axios";
import axiosInstance from "../utils/axiosInstance";

import { IUserDetails } from '../interfaces';

const getUsers = (): Promise<AxiosResponse<IUserDetails[]>> => {
  return axiosInstance.get<IUserDetails[]>('/user');
};

const UserService = {
  getUsers
};


export default UserService;