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
  // expiresIn?: number;
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
  return axiosInstance
    .post<IUserSession>("/register", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );
      }
      return response;
    });
};

const logout = (refreshToken: string): Promise<AxiosResponse<IUserSession>> => {
  //TODO:
  //how do we logout?? on the server side?
  //destroy the session? destroy the cookie? destroy the token?
  //or just clear the session?
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return axiosInstance.post("/logout", refreshToken);
};

const refreshToken = (
  refreshToken: string
): Promise<AxiosResponse<IUserSession>> => {
  return axiosInstance.post("/refresh", refreshToken);
};

const AuthService = {
  getUsers,
  login,
  register,
  logout,
  refreshToken,
};

export default AuthService;
