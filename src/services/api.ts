import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  config.headers["X-API-Key"] = process.env.NEXT_PUBLIC_API_KEY;
  return config;
});

export default api;
