import axios from 'axios';
import { baseUrl } from "../config/routes";
import { getAuthToken, clearAuthTokens } from "../utils/auth";

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

// Request interceptor to add auth token
instance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      if (!config.headers) {
        config.headers = {} as any;
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - clear invalid session
    if (error.response?.status === 401) {
      clearAuthTokens();
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("Access forbidden:", error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default instance;