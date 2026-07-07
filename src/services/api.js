import axios from "axios";
import { toast } from "react-hot-toast";

// Create Axios instance with a clear backend target for production and local dev
const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://startup-crm-lite-production-071e.up.railway.app");

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000
});

// Request Interceptor: Attach JWT Token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("crm-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling & Auth Redirects
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("crm-token");
      // Check if we are not already on the login or register pages to avoid infinite redirect loops
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register"
      ) {
        window.location.href = "/login";
      }
    }

    // Check for network connectivity errors
    if (!error.response || error.code === "ERR_NETWORK" || error.code === "ECONNABORTED") {
      console.error("API request failed", error);
      toast.error("Cannot connect to server. Check your connection.");
    }

    return Promise.reject(error);
  }
);

export default api;
