import axiosInstance from "../utils/axiosInstance";

let accessToken = "";

function getUserSession() {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  return {
    accessToken: token,
    refreshToken: refreshToken,
    user: { id: undefined, email: "not set" },
  };
}

export const getAccessToken = () => {
  accessToken = localStorage.getItem("token") || accessToken;
  return accessToken;
};

export const setAccessToken = (token: string) => {
  accessToken = token;
  axiosInstance.interceptors.request.use(
    (config: any) => {
      //   const token = localStorage.getItem("token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

const getCurrentUser = () => {
  return JSON.parse(String(localStorage.getItem("user")));
};

const TokenService = {
  getUserSession,
  getAccessToken,
  setAccessToken,
  getCurrentUser,
};

export default TokenService;
