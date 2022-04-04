import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    "https://eikyz5cux7.execute-api.us-east-2.amazonaws.com/prod/expenses",
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  function (config) {
    debugger;
    let token = localStorage.getItem("token");
    if (token) config.headers.common["Authorization"] = token;
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
