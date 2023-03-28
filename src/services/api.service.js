import axios from "axios";

const getToken = () => localStorage["token"];

const BASE_URL = "http://localhost:8080/v1/api";

export const createApiClient = (baseURL, needAuth = false) => {
  const apiClient = axios.create({
    baseURL: `${BASE_URL}${baseURL}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (needAuth) {
    apiClient.interceptors.request.use(async (config) => {
      return {
        ...config,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };
    });
  }

  return apiClient;
};
