import type { SignUpRequest } from "../../components/auth/SignUp";
import { getAuthService } from "../../services/auth";
import type { AuthStorageData, LoginCredentials } from "../../services/auth/types";
import api from "../api";

export const auth = {
    login: async (credentials: LoginCredentials) => {
        const response = await api.post('/auth/sign-in', credentials);
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