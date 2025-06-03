import type { AxiosResponse } from "axios";
import type { SignUpRequest } from "../../components/auth/SignUp";
import { getAuthService } from "../../services/auth";
import type { AuthResponse, AuthStorageData, GoogleAuthCredentials, LoginCredentials } from "../../services/auth/types";
import api from "../api";

export const auth = {
    login: async (credentials: LoginCredentials) => {       
        const response: AxiosResponse<AuthResponse> = await api.post('/auth/sign-in', credentials);

        const authService = getAuthService();
        let token: string | undefined;

        if (authService.getTokenTransportationMethod() === 'header') {
            token = response.headers.authorization?.replace("Bearer ", "");
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        }

        return {...response.data, accessToken: token};
    },
    loginWithGoogle: async (credentials: GoogleAuthCredentials) => {
        const response = await api.post('/auth/google', credentials);

        const authService = getAuthService();
        
        if (authService.getTokenTransportationMethod() === 'header') {
            api.defaults.headers.common['Authorization'] = `Bearer ${response.headers.authorization.replace("Bearer ", "")}`;
        }
        return response.data;
    },
    signUp: async (credentials: SignUpRequest) => {
        const response = await api.post('/auth/sign-up', credentials);
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/auth/sign-out');
        return response.data;
    },
    refreshSession: async (
        authData: AuthStorageData
    ) => {
        if (getAuthService().getTokenTransportationMethod() === 'cookie') {
            const response = await api.post('/auth/refresh');
            return response.data;
        } else if (getAuthService().getTokenTransportationMethod() === 'header') {
            const response = await api.post('/auth/refresh', {
                headers: {
                    'Authorization': `Bearer ${authData.refreshToken}`
                }
            });
            return response.data;
        }
    }
}

export default auth;