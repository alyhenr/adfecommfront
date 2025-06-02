import { setUser } from "../../reducers/auth/authReducer";
import type { Dispatch } from "@reduxjs/toolkit";
import type { LoginRequest, SignUpRequest, GoogleAuthRequest } from "../../types/auth";
import { AxiosError } from "axios";
import api from "../../../api/api";
import { getAuthService } from "../../../services/auth";

export const authenticateUser = (credentials: LoginRequest) => async (dispatch: Dispatch): Promise<{
    success: boolean, message: string
}> => {
    try {
        const authService = getAuthService();
        console.log(authService);
        const response = await authService.login(credentials);
        
        dispatch(setUser({ 
            user: response.user,
            expiresIn: response.expiresIn
        }));
        
        return { success: true, message: `Bem vindo novamente ${response.user.username}` };
    } catch (error) {
        if (error instanceof AxiosError) {
            return { success: false, message: error?.response?.data?.message };
        }
        return { success: false, message: "Falha ao realizar login" };
    }
};

export const registerUser = (userData: SignUpRequest) => async (_dispatch: Dispatch) => {
    try {
        await api.post(`/auth/sign-up`, userData);
        return { success: true, message: `Registrado com sucesso`, redirectTo: "/login" };
    } catch (error) {
        if (error instanceof AxiosError) {
            return { success: false, message: error?.response?.data?.message };
        }
        return { success: false, message: "Falha ao criar conta" };
    }
};

export const logoutUser = () => async (dispatch: Dispatch) => {
    const authService = getAuthService();
    await authService.logout();
    
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
        const authService = getAuthService();
        const response = await authService.loginWithGoogle(credentials);
        
        dispatch(setUser({ 
            user: response.user,
            expiresIn: response.expiresIn
        }));
        
        return { success: true, message: `Bem vindo ${response.user.username}` };
    } catch (error) {
        if (error instanceof AxiosError) {
            return { success: false, message: error?.response?.data?.message };
        }
        return { success: false, message: "Falha ao realizar login com Google" };
    }
}; 