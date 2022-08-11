import { AxiosResponse } from "axios";
import client from "../utils/api-client";
import { IUserDetails } from "../interfaces";
import { NAVIGATION_ROUTES } from "constants/navigation";
import { TokenService } from "services";

const getUsers = (): Promise<AxiosResponse<IUserDetails[]>> => {
  return client.get<IUserDetails[]>("/user");
};

function handleUserResponse({ user }) {
  window.localStorage.setItem(localStorageKey, user.token);
  return user;
}

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
  return client
    .post<IUserSession>("/login", {
      email,
      password,
    })
    .then((response) => {
      // console.log("login acc data", response.data.accessToken);

      // TokenService.setAccessToken(response.data.accessToken || "");
      // TokenService.setRefreshToken(response.data.refreshToken || "");

      if (response.data.user) {
        TokenService.setUser(response.data.user || "");
      }
      if (response.data.accessToken) {
        TokenService.setAccessToken(response.data.accessToken || "");
      }
      if (response.data.refreshToken) {
        TokenService.setRefreshToken(response.data.refreshToken || "");
      }
      window.location.reload();
      return response;
    });
};

const register = ({
  email,
  password,
}: UserCredentials): Promise<AxiosResponse<IUserSession>> => {
  return client.post<IUserSession>("/register", {
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
  return client.post(NAVIGATION_ROUTES.LOGOUT);
};

const refreshToken = (
  refreshToken: string
): Promise<AxiosResponse<IUserSession>> => {
  return client.post(NAVIGATION_ROUTES.REFRESH, refreshToken);
};

const AuthService = {
  getUsers,
  login,
  register,
  logout,
  refreshToken,
};

export default AuthService;
