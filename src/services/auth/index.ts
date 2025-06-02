import type { AuthService } from './types';
import { JWTCookieAuthService } from './JWTCookieAuthService';
import { OAuth2AuthService } from './OAuth2AuthService';

export type AuthMethod = 'jwt_cookie' | 'oauth2';

let authService: AuthService;

export const initializeAuth = (method: AuthMethod = 'jwt_cookie'): AuthService => {
    switch (method) {
        case 'jwt_cookie':
            authService = new JWTCookieAuthService();
            break;
        case 'oauth2':
            authService = new OAuth2AuthService();
            break;
        default:
            throw new Error(`Unsupported auth method: ${method}`);
    }
    return authService;
};

export const getAuthService = (): AuthService => {
    if (!authService) {
        throw new Error('Auth service not initialized. Call initializeAuth first.');
    }
    return authService;
};

// Initialize with default method
initializeAuth();

// Re-export types
export * from './types'; 