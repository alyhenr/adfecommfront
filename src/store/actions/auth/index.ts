import { setUser } from "../../reducers/auth/authReducer";
import type { Dispatch } from "@reduxjs/toolkit";
import type { User } from "../../../types";
import type { LoginRequest, SignUpRequest, GoogleAuthRequest } from "../../types/auth";
import { AxiosError, type AxiosResponse } from "axios";
import api from "../../../api/api";
import { clearAuthData, storeAuthData } from "../../../utils/auth";

interface AuthResponse {
    user: User;
    expiresIn: number; // seconds until session expires
}

export const authenticateUser = (credentials: LoginRequest) => async (dispatch: Dispatch): Promise<{
    success: boolean, message: string
}> => {
    try {
        const { data }: AxiosResponse<AuthResponse> = await api.post(`/auth/sign-in`, credentials);
        
        if (data instanceof AxiosError) throw data;

        const { user, expiresIn } = data;
        
        // Store auth data with expiration
        storeAuthData(user, expiresIn);
        
        dispatch(setUser({ 
            user,
            expiresIn
        }));
        
        return { success: true, message: `Bem vindo novamente ${user.username}` };
    } catch (error) {
        if (error instanceof AxiosError) {
            return { success: false, message: error?.response?.data?.message };
        }
    }

    return { success: false, message: "Falha ao realizar login" };
};

export const registerUser = (userData: SignUpRequest) => async (_dispatch: Dispatch) => {
    try {
        const { data }: AxiosResponse<User> = await api.post(`/auth/sign-up`, userData);
        
        if (data instanceof AxiosError) throw data;
        
        return { success: true, message: `Registrado com sucesso`, redirectTo: "/login" };
    } catch (error) {
        if (error instanceof AxiosError) {
            return { success: false, message: error?.response?.data?.message };
        }
    }
    return { success: false, message: "Falha ao criar conta" };
};

export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        // Call logout endpoint to invalidate the cookie
        await api.post('/auth/sign-out');
    } catch (error) {
        console.error('Error during logout:', error);
    }
    
    clearAuthData();
    dispatch(setUser({
        user: {
            userId: -1, email: "", username: "", roles: [], 
        },
        expiresIn: 0,
    }));
};

export const authenticateWithGoogle = (credentials: GoogleAuthRequest) => async (dispatch: Dispatch): Promise<{
    success: boolean, message: string
}> => {
    try {
        const { data }: AxiosResponse<AuthResponse> = await api.post(`/auth/google`, credentials);
        
        if (data instanceof AxiosError) throw data;

        const { user, expiresIn } = data;
        
        // Store auth data with expiration
        storeAuthData(user, expiresIn);
        
        dispatch(setUser({ 
            user,
            expiresIn
        }));
        
        return { success: true, message: `Bem vindo ${user.username}` };
    } catch (error) {
        if (error instanceof AxiosError) {
            return { success: false, message: error?.response?.data?.message };
        }
    }

    return { success: false, message: "Falha ao realizar login com Google" };
}; 