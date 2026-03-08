import axios from "axios";

const url = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: `${url}/api`,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("bareer_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
