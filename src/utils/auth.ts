import type { User } from '../types';

interface StoredAuthData {
  user: User;
  expiresAt: number; // Unix timestamp in milliseconds
}

export const getStoredAuthData = (): StoredAuthData | null => {
  const authData = localStorage.getItem('loggedInUser');
  if (!authData) return null;
  
  try {
    JSON.parse(authData);
    return JSON.parse(authData);
  } catch {
    return null;
  }
};

export const isTokenValid = (): boolean => {
  const authData = getStoredAuthData();

  if (!authData) return false;
  return authData.expiresAt > Date.now();
};

export const clearAuthData = (): void => {
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('redirectAfterLogin');
};

export const storeAuthData = (user: User, expiresIn: number): void => {
  const expiresAt = Date.now() + expiresIn * 1000; // Convert seconds to milliseconds
  
  localStorage.setItem('loggedInUser', JSON.stringify({
    user,
    expiresAt
  }));
}; 