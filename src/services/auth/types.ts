import type { User } from "../../types";

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

export interface AuthService {
    login(credentials: LoginCredentials): Promise<AuthResponse>;
    loginWithGoogle(credentials: GoogleAuthCredentials): Promise<AuthResponse>;
    logout(): Promise<void>;
    refreshSession?(): Promise<AuthResponse>; // Optional - implemented by OAuth2
    isAuthenticated(): boolean;
    getStoredAuthData(): AuthStorageData | null;
    clearAuthData(): void;
    storeAuthData(response: AuthResponse): void;
} 