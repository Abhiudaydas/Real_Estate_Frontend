import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // CRITICAL: Send cookies
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    console.error(
      "[API Response Error]",
      error.response?.status,
      error.config?.url,
    );

    const originalRequest = error.config;

    // Don't retry on these endpoints to avoid infinite loops
    if (
      error.config?.url?.includes("/refresh-token") ||
      error.config?.url?.includes("/login") ||
      error.config?.url?.includes("/register")
    ) {
      return Promise.reject(error);
    }

    // If 401 and not already retried, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          {},
          { withCredentials: true },
        );
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("[Token Refresh Failed]", refreshError);
        // Don't redirect here, let the component handle it
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
