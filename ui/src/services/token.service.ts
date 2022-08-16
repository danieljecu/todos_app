import { IUserDetails, IUserSession } from "interfaces";

let accessToken = "",
  refreshToken = "";

function getUserSession() {
  const token = getLocalAccessToken();
  const refreshToken = getLocalRefreshToken();
  const user = getUser();

  return {
    accessToken: token,
    refreshToken: refreshToken,
    user: user,
  };
}

const getLocalAccessToken = () => {
  accessToken = localStorage.getItem("accessToken") || accessToken;
  return accessToken;
};

const getLocalRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const setAccessToken = (token: string) => {
  accessToken = token;
  localStorage.setItem("accessToken", accessToken);
};
const setRefreshToken = (token: string) => {
  refreshToken = token;
  localStorage.setItem("refreshToken", refreshToken);
};

const updateNewAccessToken = (token: string) => {
  accessToken = token;
  localStorage.setItem("accessToken", accessToken as string);
};

const handleLogout = async () => {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
  window.localStorage.removeItem("user");
}; // clear the token in localStorage and the user data

const getUser = () => {
  return JSON.parse(
    window.localStorage.getItem("user") ||
      JSON.stringify({ id: undefined, email: "not set" })
  );
};

const setUser = (user: any) => {
  //   console.log(JSON.stringify(user));
  localStorage.setItem("user", JSON.stringify(user));
};
// This tocken service is used to handle the token in the app, to not think about localStorage
const TokenService = {
  getUserSession,
  getLocalAccessToken,
  getLocalRefreshToken,
  setAccessToken,
  setRefreshToken,
  updateNewAccessToken,
  handleLogout,
  setUser,
  getUser,
};

export default TokenService;
