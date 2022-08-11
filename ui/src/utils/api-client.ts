//@es-lint-disable-next-line no-unused-vars
import axios, { AxiosRequestHeaders, AxiosRequestConfig } from "axios";
import { NAVIGATION_ROUTES } from "constants/navigation";
import { TokenService } from "../services";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config: any) => {
    //if accestoken is expired, refresh it
    const accessToken = TokenService.getLocalAccessToken(); //This can be getAccessToken()

    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalConfig = err.config;
    console.log("org,:", originalConfig);

    if (err.response && err.response.status === 401) {
      const refreshToken = TokenService.getLocalRefreshToken();

      // this should check if the URL is not the refresh and if the refresh token exists it should try get a new access token
      if (originalConfig.url !== NAVIGATION_ROUTES.REFRESH && refreshToken) {
        try {
          const rs = await client.post(NAVIGATION_ROUTES.REFRESH, {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          console.log("response", rs);

          const { accessToken } = rs.data;

          console.log("updateNewAccessToken", accessToken);
          TokenService.setAccessToken(accessToken);

          return client(originalConfig);
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

export default client;
