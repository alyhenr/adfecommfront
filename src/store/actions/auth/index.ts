import { setUser } from "../../reducers/auth/authReducer";
import type { Dispatch } from "@reduxjs/toolkit";
import type { User } from "../../../types";
import type { LoginRequest, SignUpRequest, GoogleAuthRequest } from "../../types/auth";
import { AxiosError, type AxiosResponse } from "axios";
import api from "../../../api/api";

export const authenticateUser = (credentials: LoginRequest) => async (dispatch: Dispatch): Promise<{
    success: boolean, message: string, redirectTo: string
}> => {
    try {
        const { data: user }: AxiosResponse<User> = await api.post(`/auth/sign-in`, credentials);
        
        if (user instanceof AxiosError) throw user;

        localStorage.setItem("loggedInUser", JSON.stringify({
            user
        }));
        
        dispatch(
            setUser({
                user: user
            })
        );
        
        return { success: true, message: `Bem vindo novamente ${user.username}`, redirectTo: "/" };
    } catch (error) {
        if (error instanceof AxiosError) {
            return { success: false, message: error?.response?.data?.message, redirectTo: "/login" };
        }
    }

    return { success: false, message: "Falha ao realizar login", redirectTo: "/login" };
};

export const registerUser = (userData: SignUpRequest) => async (_dispatch: Dispatch) => {
    try {
        const { data }: AxiosResponse<User> = await api.post(`/auth/sign-up`, userData);
        
        if (data instanceof AxiosError) throw data;
        
        return { success: true, message: `Registrado com sucesso`, redirectTo: "/login" };
    } catch (error) {
        if (error instanceof AxiosError) {
            return { success: false, message: error?.response?.data?.message, redirectTo: "/sign-up" };
        }
    }
    return { success: false, message: "Falha ao criar conta", redirectTo: "/sign-up" };
};

export const logoutUser = () => async (dispatch: Dispatch) => {
    localStorage.removeItem("loggedInUser");
    dispatch(setUser({
        user: {
            userId: -1, email: "", username: "", roles: [], 
        }
    }));
    //TODO: invalidate token on backend
};

export const authenticateWithGoogle = (credentials: GoogleAuthRequest) => async (dispatch: Dispatch): Promise<{
    success: boolean, message: string, redirectTo: string
}> => {
    try {
        const { data: user }: AxiosResponse<User> = await api.post(`/auth/google`, credentials);
        
        if (user instanceof AxiosError) throw user;

        localStorage.setItem("loggedInUser", JSON.stringify({
            user
        }));
        
        dispatch(
            setUser({
                user: user
            })
        );
        
        return { success: true, message: `Bem vindo ${user.username}`, redirectTo: "/" };
    } catch (error) {
        if (error instanceof AxiosError) {
            return { success: false, message: error?.response?.data?.message, redirectTo: "/login" };
        }
    }

    return { success: false, message: "Falha ao realizar login com Google", redirectTo: "/login" };
}; 