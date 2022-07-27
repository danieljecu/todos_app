import axios, { AxiosRequestHeaders, AxiosRequestConfig } from "axios";
import { TokenService } from "../services";

// function getApiUrl() {
//   return process.env.API_HOST || "localhost:3000";
// }

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || "http://localhost:3000/",
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    //if accestoken is expired, refresh it
    const { accessToken, refreshToken } = TokenService.getUserSession();

    if (accessToken) {
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
    const originalConfig = err.config;
    console.log("org,:", originalConfig);

    if (err.response && err.response.status === 401) {
      const refreshUrl = "/refresh";
      const refreshToken = TokenService.getRefreshToken();

      // this should check if the URL is not the refresh and if the refresh token exists it should try get a new access token
      if (originalConfig.url !== refreshUrl && refreshToken) {
        try {
          const rs = await axiosInstance.post("/refresh", {
            refreshToken: TokenService.getRefreshToken(),
          });

          console.log("response", rs);

          const { accessToken } = rs.data;

          console.log("updateNewAccessToken", accessToken);
          TokenService.setAccessToken(accessToken);

          return axiosInstance(originalConfig);
        } catch (_error) {
          console.log("remove refresh token expired");
          TokenService.handleLogout();
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
