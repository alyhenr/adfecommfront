import type { User } from "../../types";
import type { AuthMethod } from "./index";

export interface AuthResponse {
    user: User;
    expiresIn: number;
    accessToken?: string; // Optional for OAuth2
    refreshToken?: string; // Optional for OAuth2
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface GoogleAuthCredentials {
    credential: string;
}

export interface AuthStorageData {
    user: User;
    expiresAt: number;
    accessToken?: string;
    refreshToken?: string;
}

export type TokenTransportationMethod = 'cookie' | 'header';

export interface AuthService {
    login(credentials: LoginCredentials): Promise<AuthResponse>;
    loginWithGoogle(credentials: GoogleAuthCredentials): Promise<AuthResponse>;
    logout(): Promise<void>;
    refreshSession?(): Promise<AuthResponse>; // Optional - implemented by OAuth2
    isAuthenticated(): boolean;
    isLoggedIn(): boolean;
    getStoredAuthData(): AuthStorageData | null;
    clearAuthData(): void;
    storeAuthData(response: AuthResponse): void;
    getAuthMethod(): AuthMethod;
    setAuthMethod(method: AuthMethod): void;
    getTokenTransportationMethod(): TokenTransportationMethod;
    setTokenTransportationMethod(method: TokenTransportationMethod): void;
} 