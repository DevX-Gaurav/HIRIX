import axios from "axios";
import { BASE_URI } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URI,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* request interceptor */

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* response interceptor */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    /* handle common errors globally */
    if (error.response) {
      if (error.response.status === 401) {
        /* reidrect to login page */
        window.location.href = "/";
      } else if (error.response.status === 500) {
        console.error(`Server error. please try again later`);
      } else if (error.code === "ECONNABORTED") {
        console.error(`Request timeout. Please try again`);
      }
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
