import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (req) => {
    // Useful placeholder for adding auth headers later
    return req;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (light, safe, realistic)
api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
