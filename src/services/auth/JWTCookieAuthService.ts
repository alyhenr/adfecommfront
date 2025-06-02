import type { AuthService, AuthResponse, LoginCredentials, GoogleAuthCredentials, AuthStorageData } from './types';
import api from '../../api/api';

export class JWTCookieAuthService implements AuthService {
    private readonly storageKey = 'loggedInUser';

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        console.log(credentials);
        
        const { data } = await api.post<AuthResponse>('/auth/sign-in', credentials);
        this.storeAuthData(data);
        return data;
    }

    async loginWithGoogle(credentials: GoogleAuthCredentials): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>('/auth/google', credentials);
        this.storeAuthData(data);
        return data;
    }

    async logout(): Promise<void> {
        try {
            await api.post('/auth/sign-out');
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            this.clearAuthData();
        }
    }

    isAuthenticated(): boolean {
        const authData = this.getStoredAuthData();
        if (!authData) return false;
        return authData.expiresAt > Date.now();
    }

    getStoredAuthData(): AuthStorageData | null {
        const data = localStorage.getItem(this.storageKey);
        if (!data) return null;
        
        try {
            return JSON.parse(data);
        } catch {
            return null;
        }
    }

    clearAuthData(): void {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem('redirectAfterLogin');
    }

    storeAuthData(response: AuthResponse): void {
        const authData: AuthStorageData = {
            user: response.user,
            expiresAt: Date.now() + (response.expiresIn * 1000),
        };
        
        localStorage.setItem(this.storageKey, JSON.stringify(authData));
    }
} 