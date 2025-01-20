import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  baseURL: "https://stripe-billing-service-production.up.railway.app",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;