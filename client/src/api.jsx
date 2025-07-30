
import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_BASE_URL;

const API = axios.create({

  baseURL: `${API_BASE_URL}/api`,
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('❌ Token not found');
  }

  return config;
});

export default API;
