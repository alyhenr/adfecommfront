import axios from 'axios';
import { isTokenValid, clearAuthData, getStoredAuthData } from '../utils/auth';
import { store } from '../store/reducers/store';
import { setUser } from '../store/reducers/auth/authReducer';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
  withCredentials: true, // This is important for sending/receiving cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to handle expired sessions
api.interceptors.request.use(
  (config) => {
    const authData = getStoredAuthData();
    // If we have auth data but it's expired, clear everything
    if (!isTokenValid()) {
      clearAuthData();
      store.dispatch(setUser({
        user: {
          userId: -1,
          email: "",
          username: "",
          roles: [],
        },
        expiresIn: 0,
      }));
      
      // If this is not an auth endpoint, reject the request and show notification
      if (!config.url?.includes('/public/')) {
        if (!config.url?.includes('/auth/')) {
          return Promise.reject(new Error('Sua sessão expirou. Por favor, faça login novamente.'));
        }
        if (authData && authData.user.userId > 0) {
          toast.error('Sua sessão expirou. Por favor, faça login novamente.');
        }
      }
      
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
  (error) => {
    if (error.response?.status === 401 && !error.config.url?.includes('/auth/')) {
      // Clear auth data on 401 errors (except for auth endpoints)
      clearAuthData();
      store.dispatch(setUser({
        user: {
          userId: -1,
          email: "",
          username: "",
          roles: [],
        },
        expiresIn: 0,
      }));
      
      // Show session expired notification
      toast.error('Sua sessão expirou. Por favor, faça login novamente.');
    }
    return Promise.reject(error);
  }
);

export default api;