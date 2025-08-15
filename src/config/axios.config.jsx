import axios from "axios";

// Creating a new axios instance with base config
const config = {
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base URL from environment
  withCredentials: true, // Include credentials in requests
  timeout: 5000, // Added a timeout (won't break anything if your requests are fast)
  headers: {
    "Content-Type": "application/json", // Explicitly set Content-Type
  },
};

// Initialize axios instance
const instance = axios.create(config);

// Optional: intercept requests (currently does nothing)
instance.interceptors.request.use((request) => {
  // Could modify request here, but currently returning as-is
  return request;
});

export default instance;
