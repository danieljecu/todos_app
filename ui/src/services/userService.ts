import { AxiosResponse } from "axios";
import axiosInstance from "../utils/axiosInstance";
import { IUserDetails } from "../interfaces";

const getUsers = (): Promise<AxiosResponse<IUserDetails[]>> => {
  return axiosInstance.get<IUserDetails[]>("/user");
};

interface UserCredentials {
  email: string;
  password: string;
}

interface IUserSession {
  user: IUserDetails;
  accessToken?: string;
  expiresIn?: number;
  // tokenType?: string;
  // refreshToken?: string;
  // roles?: [];
}

const login = ({
  email,
  password,
}: UserCredentials): Promise<AxiosResponse<IUserSession>> => {
  return axiosInstance.post<IUserSession>("/login", {
    email,
    password,
  });
};

const register = ({
  email,
  password,
}: UserCredentials): Promise<AxiosResponse<IUserSession>> => {
  return axiosInstance.post<IUserSession>("/register", {
    email,
    password,
  });
};

const UserService = {
  getUsers,
  login,
  register,
};

export default UserService;
