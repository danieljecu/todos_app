import { AxiosResponse } from "axios";
import axiosInstance from "../utils/axiosInstance";
import { IUserDetails } from "../interfaces";
import { NAVIGATION_ROUTES } from "constants/navigation";
import { TokenService } from "services";

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
  refreshToken?: string;
  // [x: string]: string;
  // expiresIn?: number;
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

  // .then((response) => {
  //   if (response.data.accessToken) {
  //     localStorage.setItem(
  //       "accessToken",
  //       JSON.stringify(response.data.accessToken)
  //     );
  //   }
  // if (response.data.refreshToken) {
  //   localStorage.setItem(
  //     "refreshToken",
  //     JSON.stringify(response.data.refreshToken)
  //   );
  // return response;
  // });
};

const register = ({
  email,
  password,
}: UserCredentials): Promise<AxiosResponse<IUserSession>> => {
  return axiosInstance.post<IUserSession>("/register", {
    email,
    password,
  });
  // .then((response) => {
  //   if (response.data.accessToken) {
  //     localStorage.setItem(
  //       "accessToken",
  //       JSON.stringify(response.data.accessToken)
  //     );
  //   }
  // return response;
  // });
};

const logout = (
  refreshToken?: string
): Promise<AxiosResponse<IUserSession>> => {
  //TODO:
  //how do we logout?? on the server side?
  //to log out means to invalidate the token
  //or ONLY remove token on the client

  TokenService.handleLogout();
  return axiosInstance.post(NAVIGATION_ROUTES.LOGOUT);
};

const refreshToken = (
  refreshToken: string
): Promise<AxiosResponse<IUserSession>> => {
  return axiosInstance.post(NAVIGATION_ROUTES.REFRESH, refreshToken);
};

const AuthService = {
  getUsers,
  login,
  register,
  logout,
  refreshToken,
};

export default AuthService;
