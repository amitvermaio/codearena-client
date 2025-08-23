import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
});

instance.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    console.log('Interceptor caught error:', error.response?.status);
    // access token expire (401) 
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // console.log('Attempting token refresh...');
      try {
        const response = await instance.post("/auth/refresh-token");
        // console.log('Token refresh successful:', response.status);
        
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
