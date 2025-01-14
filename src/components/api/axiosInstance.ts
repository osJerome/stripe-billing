import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.VITE_APP_BASE_URL || "http://localhost:8000",
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
