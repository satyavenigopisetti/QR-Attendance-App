import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({ baseURL: API_URL });

export const register = (data) => api.post('/register', data);
export const login = (data) => api.post('/login', data);
export const generateQR = (data) => api.post('/generate-qr', data);
export const markAttendance = (data) => api.post('/mark-attendance', data);
