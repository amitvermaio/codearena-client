import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Create a flag to prevent multiple refresh token requests
let isRefreshing = false;
let failedQueue = [];

// Function to process the queue of failed requests
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (originalRequest.url === '/auth/refresh-token') {
      // If the refresh token request fails, redirect to signin
      console.error("Refresh token request failed, redirecting to signin...");
      window.location.href = "/signin";
      return Promise.reject(error);
    }

    // Only handle 401 errors
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh is already in progress, queue the failed request
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return instance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await instance.post("/auth/refresh-token");
        isRefreshing = false;
        
        // Process the queue with the new token
        processQueue(null, response.data.token);

        return instance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        // Process the queue with the refresh error
        processQueue(refreshError, null);

        console.error("Refresh failed, redirecting to signin...");
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
