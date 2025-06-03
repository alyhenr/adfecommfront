import axios from "axios";
import { getAuthService, type AuthResponse, type AuthService, type AuthStorageData } from "../services/auth";
import { store } from "../store/reducers/store";
import { setUser } from "../store/reducers/auth/authReducer";
import toast from "react-hot-toast";
import auth from "./auth/auth";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
  // withCredentials: true, // Keep this for CSRF tokens if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshSession = async (authService: AuthService, authData: AuthStorageData) => {
  if (authService.getTokenTransportationMethod() === 'cookie') {
      const response: AuthResponse = await auth.refreshSession(authData);
      console.log(response);
      return response;
  } else if (authService.getTokenTransportationMethod() === 'header') {
      if(authData.refreshToken) {
          const response: AuthResponse = await auth.refreshSession(authData);
          console.log(response);
          return response;
      } else {
      return Promise.reject(new Error('Usuário não autenticado. Por favor, faça login.'));
      }
  }
  return Promise.reject(new Error('Método de autenticação não suportado.'));
}

// Request interceptor to handle authentication
api.interceptors.request.use(
  async (config) => {
    const authService = getAuthService();
    const authData = authService.getStoredAuthData();

    if (authService.getAuthMethod() === 'jwt') {//No refresh token, so keep token in cookies, if in production
      if(authService.isAuthenticated()) {
        if (authService.getTokenTransportationMethod() === 'header') {
          config.headers.Authorization = `Bearer ${authData?.accessToken}`; //Only use this for the demo version, (accesToken in local storage)
        }
        return config;
      } 
    } else if (authService.getAuthMethod() === 'oauth2') { //Access token in headers and refresh token in cookies
      if (!authService.isAuthenticated() && authData?.accessToken) {
        const response = await refreshSession(authService, authData);
  
        if (response.accessToken) {
            config.headers.Authorization = `Bearer ${response.accessToken}`;

            return config;
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
        config.headers.Authorization = `Bearer ${authData.accessToken}`;
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
  async (error) => {
    const originalRequest = error.config;
    const authService = getAuthService();
    // Handle 401 errors
    if (error.response?.status === 401) {      
      if (authService.getAuthMethod() === 'jwt') {
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
          toast.error("Sua sessão expirou. Por favor, faça login novamente.");
          window.location.href = '/login';
          return Promise.reject(error);
      } else if (authService.getAuthMethod() === 'oauth2' && !originalRequest._retry) {
        originalRequest._retry = true;
        const authData = authService.getStoredAuthData();
        if (!authData) {
          return Promise.reject(new Error('Usuário não autenticado. Por favor, faça login.'));
        }
        
        const newAuthData = await refreshSession(authService, authData);
        if (newAuthData.accessToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${newAuthData.accessToken}`;
          return api(originalRequest);
        }
        
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
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;