import axios, { AxiosRequestHeaders } from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/",
});

// require("dotenv").config();
//reading env doesn't work so i need to set it manualy process.env.accessToken
localStorage.setItem(
  "token",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjQzMjAzMDk1LCJleHAiOjE2NDMyODk0OTV9.C6BfeINUi8f-_bMWx-PRRRRztyyx8BncINKSpS7XgBA" ||
    "not set"
);

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
