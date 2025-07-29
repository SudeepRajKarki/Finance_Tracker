
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5002/api',
});

API.interceptors.request.use((config) => {
  // ✅ Retrieve token from saved user object
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
