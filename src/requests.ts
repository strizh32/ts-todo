import axios, { AxiosInstance, AxiosResponse } from "axios";

const axiosRequest: AxiosInstance = axios.create({
  baseURL:
    process.env.VUE_APP_HTTP_URL || "https://jsonplaceholder.typicode.com",
  timeout: 20000
});

export const getUsers = (_page: number, _limit = 5): Promise<AxiosResponse> => {
  return axiosRequest.get("/users", {
    params: { _page, _limit }
  });
};

export const getUserById = (id: number): Promise<AxiosResponse> => {
  return axiosRequest.get("/users", {
    params: { id }
  });
};

export const getUserToDos = (userId: number): Promise<AxiosResponse> => {
  return axiosRequest.get("/todos", {
    params: { userId }
  });
};
