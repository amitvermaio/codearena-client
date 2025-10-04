import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

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

// Attach access token from localStorage to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
<<<<<<< HEAD
  res => res,
  async err => {
    const originalConfig = err.config;
    
    if (err.response?.status === 401 && !originalConfig._retry) {
      if (isRefreshing) {
        // Queue the request while token is being refreshed
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalConfig.headers['Authorization'] = `Bearer ${token}`;
            return instance(originalConfig);
          })
          .catch(err => Promise.reject(err));
=======
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest.url === '/auth/refresh-token') {
      // If the refresh token request itself fails, just reject and let UI handle it
      console.error("Refresh token request failed");
      return Promise.reject(error);
    }

    // Only handle 401 errors
    if (status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        // If a refresh is already in progress, queue the failed request
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            if (newToken) {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            }
            return instance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
>>>>>>> 8045ce6d5d3d2d26e1f309468f69b656e28c7de6
      }

      originalConfig._retry = true;
      isRefreshing = true;

      try {
<<<<<<< HEAD
        console.log('call lagi');
        const { data } = await instance.post('/auth/refresh-token');
        console.log('call khatam');
        console.log(data)
        const newAccessToken = data.accessToken;
        
        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        processQueue(null, newAccessToken);
        
        return instance(originalConfig);
=======
        // Ensure we do not send the stale Authorization header when refreshing
        const response = await instance.post("/auth/refresh-token", null, {
          headers: { Authorization: undefined },
        });
        isRefreshing = false;
        const newToken = response?.data?.token;

        if (newToken) {
          // Persist the new token and update default headers
          localStorage.setItem("access_token", newToken);
          instance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        }

        // Process the queue with the new token
        processQueue(null, newToken);

        // Retry the original request with updated header
        originalRequest.headers = originalRequest.headers || {};
        if (newToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        }
        return instance(originalRequest);
>>>>>>> 8045ce6d5d3d2d26e1f309468f69b656e28c7de6
      } catch (refreshError) {
        processQueue(refreshError, null);
<<<<<<< HEAD
        delete instance.defaults.headers.common['Authorization'];
        window.location.href = '/signin';
=======

        console.error("Refresh failed");
        // Clear any stale token
        localStorage.removeItem("access_token");
>>>>>>> 8045ce6d5d3d2d26e1f309468f69b656e28c7de6
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
<<<<<<< HEAD
    
    return Promise.reject(err);
=======

    return Promise.reject(error);
>>>>>>> 8045ce6d5d3d2d26e1f309468f69b656e28c7de6
  }
);

export default instance;