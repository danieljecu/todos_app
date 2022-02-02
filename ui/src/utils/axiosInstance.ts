import axios, { AxiosRequestHeaders, AxiosRequestConfig } from "axios";
import TokenService from "../services/token.service";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/",
});

// const Instance = axios.create({ baseURL: ApiUrls.BASE_URL });

axiosInstance.interceptors.request.use(
  (config: any) => {
    //if accestoken is expired, refresh it
    // const accessToken = AuthService.getAccessToken();
    // console.log("getLocalAccessToken", TokenService.getLocalAccessToken());

    // const token = TokenService.getLocalAccessToken();
    // if (token) {
    //   config.headers["x-auth-token"] = token;
    // }
    // return config;
    // },
    // (error) => {
    // return Promise.reject(error);
    // }
    const refreshUrl = "/refresh";
    const { accessToken, refreshToken } = TokenService.getUserSession();

    if (config.url === refreshUrl && refreshToken) {
      config.headers.authorization = `Bearer ${refreshToken}`;
    } else if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err.response && err.response.status === 401) {
      // this should check if the URL is not the refresh and if the refresh token exists it should try get a new access token
    }

    const originalConfig = err.config;

    if (err.response) {
      // access token expired
      if (err.response.status === 403 && !originalConfig._retry) {
        // handle infinite loop
        originalConfig._retry = true;

        // console.log("refresh", TokenService.getLocalRefreshToken());
        try {
          const rs = await axiosInstance.post("/refresh", {
            refreshToken: null, //TokenService.getLocalRefreshToken(),
          });

          console.log("response", rs);

          const { accessToken } = rs.data;

          console.log("updateNewAccessToken", accessToken);
          //TokenService.updateNewAccessToken(accessToken);

          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }

      // refresh token expired
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
