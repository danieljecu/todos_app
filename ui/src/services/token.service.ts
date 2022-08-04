import axiosInstance from "../utils/axiosInstance";

let accessToken = "",
  refreshToken = "";

function getUserSession() {
  const token = getAccessToken();
  const refreshToken = getRefreshToken();

  return {
    accessToken: token,
    refreshToken: refreshToken,
    user: { id: undefined, email: "not set" },
  };
}

const getAccessToken = () => {
  accessToken = localStorage.getItem("accessToken") || accessToken;
  return accessToken;
};

const getRefreshToken = () => {
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
}; // clear the token in localStorage and the user data

// This tocken service is used to handle the token in the app, to not think about localStorage
const TokenService = {
  getUserSession,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  updateNewAccessToken,
  handleLogout,
};

export default TokenService;
