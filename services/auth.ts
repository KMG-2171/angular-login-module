import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.130.205.130:7174/api/Auth',
});

export const register = (data: any) => api.post('/register', data);
export const login = (data: any) => api.post('/login', data);
export const getExternalLoginUrl = (provider: string) => api.get(`/external-login-url?provider=${provider}`);
export const externalLoginCallback = (params: any) => api.get('/external-login-callback', { params });
export const validateExternalToken = (data: any) => api.post('/validate-external-token', data);
export const getProfile = () => api.get('/profile');