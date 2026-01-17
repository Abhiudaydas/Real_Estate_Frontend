import axios from "./axios";

export const registerUser = async (data) => {
  return axios.post("/auth/register", data);
};

export const loginUser = async (credentials) => {
  return axios.post("/auth/login", credentials);
};

export const logoutUser = async () => {
  return axios.post("/auth/logout");
};

export const getMe = async () => {
  return axios.get("/auth/me");
};

export const refreshToken = async () => {
  return axios.post("/auth/refresh-token");
};
