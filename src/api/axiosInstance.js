import axios from "axios";

// Create an Axios instance with dynamic base URL
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api",
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`[Axios Interceptor] Bearer token attached to ${config.method.toUpperCase()} ${config.url}`);
    } else {
      console.warn(`[Axios Interceptor] NO TOKEN FOUND in localStorage for ${config.method.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle global errors like 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear storage and redirect to login if unauthorized
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // ONLY trigger hard reload redirect if this 401 did NOT come from auth/forgot flows or login
      const requestUrl = error.config?.url || "";
      const isAuthFlow = requestUrl.includes("/auth/login") || 
                         requestUrl.includes("/auth/forgot-password") || 
                         requestUrl.includes("/auth/verify-otp") || 
                         requestUrl.includes("/auth/verify-reset-otp") ||
                         requestUrl.includes("/auth/reset-password") ||
                         requestUrl.includes("/auth/change-password") ||
                         requestUrl.includes("/auth/resend-otp");

      if (!isAuthFlow) {
        window.location.href = "/login"; 
      }
    }
    return Promise.reject(error);
  }
);
