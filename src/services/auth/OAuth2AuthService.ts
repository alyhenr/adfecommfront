import type { AuthService, AuthResponse, LoginCredentials, GoogleAuthCredentials, AuthStorageData, TokenTransportationMethod } from './types';
import api from '../../api/api';
import type { AuthMethod } from '.';

export class OAuth2AuthService implements AuthService {
    private readonly storageKey = 'loggedInUser';
    private refreshPromise: Promise<AuthResponse> | null = null;
    private authMethod: AuthMethod = 'oauth2';
    private tokenTransportationMethod: TokenTransportationMethod = 'header';

    isLoggedIn(): boolean {
        const authData = this.getStoredAuthData();
        if (!authData) return false;
        return true;
    }

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>('/oauth/token', {
            grant_type: 'password',
            username: credentials.email,
            password: credentials.password,
        });
        this.storeAuthData(data);
        return data;
    }

    async loginWithGoogle(credentials: GoogleAuthCredentials): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>('/oauth/google', {
            grant_type: 'google_token',
            token: credentials.credential,
        });
        this.storeAuthData(data);
        return data;
    }

    async logout(): Promise<void> {
        const authData = this.getStoredAuthData();
        if (authData?.accessToken) {
            try {
                await api.post('/oauth/revoke', {
                    token: authData.accessToken,
                });
            } catch (error) {
                console.error('Error during token revocation:', error);
            }
        }
        this.clearAuthData();
    }

    async refreshSession(): Promise<AuthResponse> {
        // If there's already a refresh in progress, return that promise
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        const authData = this.getStoredAuthData();
        if (!authData?.refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            this.refreshPromise = api.post<AuthResponse>('/oauth/token', {
                grant_type: 'refresh_token',
                refresh_token: authData.refreshToken,
            }).then(response => {
                this.storeAuthData(response.data);
                return response.data;
            });

            return await this.refreshPromise;
        } finally {
            this.refreshPromise = null;
        }
    }

    isAuthenticated(): boolean {
        const authData = this.getStoredAuthData();
        if (!authData) return false;
        
        // Consider a small buffer time before expiration
        const bufferTime = 10000; // 10 seconds
        return authData.expiresAt > (Date.now() + bufferTime);
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
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
        };
        
        localStorage.setItem(this.storageKey, JSON.stringify(authData));
    }

    getAuthMethod(): AuthMethod {
        return this.authMethod;
    }

    setAuthMethod(method: AuthMethod): void {
        this.authMethod = method;
    }

    getTokenTransportationMethod(): TokenTransportationMethod {
        return this.tokenTransportationMethod;
    }

    setTokenTransportationMethod(method: TokenTransportationMethod): void {
        this.tokenTransportationMethod = method;
    }
} 