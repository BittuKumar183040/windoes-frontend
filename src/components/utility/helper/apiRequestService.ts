import axios from "axios";

const backendAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


import type { InternalAxiosRequestConfig } from "axios";
import { getUserFromLocal } from "./localstorage";

const interceptor = async (config: InternalAxiosRequestConfig) => {
  config.headers.userId = getUserFromLocal()?.id;
  return config;
};

backendAPI.interceptors.request.use(interceptor);


export default backendAPI;