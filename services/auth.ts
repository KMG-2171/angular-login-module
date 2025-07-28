import axios from 'axios';
import { AuthResponse, ExternalLoginUrlResponse, LoginPayload, UserProfile } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:7174/api/Auth',
});

// We can now expect a strongly-typed response from our API calls.
export const register = (data: LoginPayload) => api.post<AuthResponse>('/register', data);

export const login = (data: LoginPayload) => api.post<AuthResponse>('/login', data);

export const getExternalLoginUrl = (provider: string) => api.get<ExternalLoginUrlResponse>(`/external-login-url?providerName=${provider}`);

export const getProfile = () => api.get<UserProfile>('/profile');