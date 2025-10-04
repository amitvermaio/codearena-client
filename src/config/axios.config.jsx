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

instance.interceptors.response.use(
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
      }

      originalConfig._retry = true;
      isRefreshing = true;

      try {
        console.log('call lagi');
        const { data } = await instance.post('/auth/refresh-token');
        console.log('call khatam');
        console.log(data)
        const newAccessToken = data.accessToken;
        
        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        processQueue(null, newAccessToken);
        
        return instance(originalConfig);
      } catch (refreshError) {
        processQueue(refreshError, null);
        delete instance.defaults.headers.common['Authorization'];
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(err);
  }
);

export default instance;