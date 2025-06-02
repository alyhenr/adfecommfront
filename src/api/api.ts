import axios from 'axios';
import { getAuthService } from '../services/auth';
import { store } from '../store/reducers/store';
import { setUser } from '../store/reducers/auth/authReducer';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
  withCredentials: true, // Keep this for CSRF tokens if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to handle authentication
api.interceptors.request.use(
  async (config) => {
    const authService = getAuthService();
    const authData = authService.getStoredAuthData();
    
    // If we have auth data but it's expired, try to refresh or clear
    if (!authService.isAuthenticated()) {
      if (authService.refreshSession && authData?.refreshToken) {
        try {
          const newAuthData = await authService.refreshSession();
          // Update auth header with new token
          if (newAuthData.accessToken) {
            config.headers.Authorization = `Bearer ${newAuthData.accessToken}`;
          }
          return config;
        } catch (error) {
          console.error('Failed to refresh session:', error);
        }
      }
      
      // If refresh failed or not available, clear auth data
      authService.clearAuthData();
      store.dispatch(setUser({
        user: {
          userId: -1,
          email: "",
          username: "",
          roles: [],
        },
        expiresIn: 0,
      }));
      
      // If this is not a public or auth endpoint, reject the request
      if (!config.url?.includes('/public/')) {
        if (!config.url?.includes('/auth/')) {
          return Promise.reject(new Error('Sua sessão expirou. Por favor, faça login novamente.'));
        }
        if (authData && authData.user.userId > 0) {
          toast.error('Sua sessão expirou. Por favor, faça login novamente.');
        }
      }
    } else if (authData?.accessToken) {
      // If we have a valid token, add it to the request
      config.headers.Authorization = `Bearer ${authData.accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const authService = getAuthService();
      
      // Try to refresh the token if available
      if (authService.refreshSession) {
        try {
          const newAuthData = await authService.refreshSession();
          if (newAuthData.accessToken) {
            api.defaults.headers.common['Authorization'] = `Bearer ${newAuthData.accessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
        }
      }
      
      // If refresh failed or not available, clear auth data
      authService.clearAuthData();
      store.dispatch(setUser({
        user: {
          userId: -1,
          email: "",
          username: "",
          roles: [],
        },
        expiresIn: 0,
      }));
      
      if (!originalRequest.url?.includes('/auth/')) {
        toast.error('Sua sessão expirou. Por favor, faça login novamente.');
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;