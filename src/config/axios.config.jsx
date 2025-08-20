import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // access token expire (401) 
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await instance.post("/auth/refresh-token");
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed, redirecting to login...");
        window.location.href = "/login"; 
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
