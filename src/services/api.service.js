import axios from "axios";

const getToken = () => localStorage["token"];

export const createApiClient = (baseURL, needAuth = false) => {
  const apiClient = axios.create({
    baseURL,
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
